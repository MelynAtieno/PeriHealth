import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { auth, db } from '../../firebaseConfig';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { toSymptomLabels } from '../constants/symptomLabels';

type EntryData = {
  date?: string;
  symptoms?: string[];
  notes?: string | null;
  createdAt?: Timestamp | null;
};

export default function PastEntryDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // Accept several param names just in case: ?day=, ?date=, ?id=
  const rawDay = (params as any).day ?? (params as any).date ?? (params as any).id;
  const dayParam = Array.isArray(rawDay) ? rawDay[0] : (rawDay as string | undefined);

  const [loading, setLoading] = React.useState(true);
  const [entry, setEntry] = React.useState<EntryData | null>(null);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    const user = auth.currentUser;
    if (!user || !dayParam) { setLoading(false); return; }
    const ref = doc(db, 'users', user.uid, 'symptoms', dayParam);
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) { setEntry(null); setNotFound(true); setLoading(false); return; }
      const d: any = snap.data();
      setEntry({
        date: d?.date,
        symptoms: Array.isArray(d?.symptoms) ? d.symptoms : [],
        notes: d?.notes ?? null,
        createdAt: d?.createdAt ?? null,
      });
      setNotFound(false);
      setLoading(false);
    }, (err) => { console.error('Entry detail error:', err); setLoading(false); });
    return () => unsub();
  }, [dayParam]);

  const user = auth.currentUser;
  if (!user) {
    return <View style={styles.center}><Text>Please log in to view this entry.</Text></View>;
  }
  if (!dayParam) {
    return (
      <View style={styles.center}>
        <Text>Missing entry id.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}><Text style={styles.backText}>GO BACK</Text></TouchableOpacity>
      </View>
    );
  }
  if (loading) {
    return <View style={styles.center}><ActivityIndicator /><Text style={{marginTop:8}}>Loading entry…</Text></View>;
  }
  if (notFound || !entry) {
    return (
      <View style={styles.center}>
        <Text>Entry not found for {dayParam}.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}><Text style={styles.backText}>GO BACK</Text></TouchableOpacity>
      </View>
    );
  }

  const dateLabel = (() => {
    const iso = entry.date || dayParam;
    try { return new Date(iso).toLocaleDateString(); } catch { return iso; }
  })();
  const labels = toSymptomLabels(entry.symptoms);
  const createdAtLabel = entry.createdAt && entry.createdAt.toDate ? entry.createdAt.toDate().toLocaleString() : '—';

  return (
    <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:40}}>
      <View style={styles.screenPad}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}><Text style={styles.backText}>GO BACK</Text></TouchableOpacity>
  <Text style={styles.titleCentered}>Entry Details</Text>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Date</Text>
          <Text style={styles.value}>{dateLabel}</Text>
          <Text style={styles.meta}>Created: {createdAtLabel}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          {labels.length ? (
            <View style={styles.chipsWrap}>
              {labels.map((lbl, i) => (
                <View key={i} style={styles.chip}><Text style={styles.chipText}>{lbl}</Text></View>
              ))}
            </View>
          ) : <Text style={styles.muted}>(No symptoms)</Text>}
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          {entry.notes ? <Text style={styles.value}>{entry.notes}</Text> : <Text style={styles.muted}>(No notes)</Text>}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:16 },
  screenPad: { paddingTop:40, paddingHorizontal:16, marginTop:50 },
  titleCentered: { fontSize:22, fontWeight:'700', marginTop:16, textAlign:'center', marginBottom:8 },
  cardCentered: { backgroundColor:'#fff', borderRadius:12, padding:16, marginTop:20, width:'90%', alignItems:'center', shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:4, elevation:2 },
  chipsWrapCentered: { flexDirection:'row', flexWrap:'wrap', justifyContent:'center' },
  backBtn: { paddingVertical:10, paddingHorizontal:16, borderRadius:10, width:100, backgroundColor:'#8e8f90ff', alignItems:'center', shadowColor:'#000', shadowOffset:{width:0,height:4}, shadowOpacity:0.3, shadowRadius:3.84 },
  backText: { fontWeight:'bold' },
  card: { backgroundColor:'#fff', borderRadius:12, padding:16, marginTop:16, shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:4, elevation:2 },
  sectionTitle: { fontSize:20, fontWeight:'bold', marginBottom:8 },
  value: { fontSize:15 },
  muted: { fontSize:14, color:'#777' },
  meta: { marginTop:6, fontSize:12, color:'#555' },
  chipsWrap: { flexDirection:'row', flexWrap:'wrap' },
  chip: { backgroundColor:'#cdd9f6', paddingVertical:8, paddingHorizontal:10, borderRadius:16, marginRight:8, marginBottom:8 },
  chipText: { fontSize: 15 }
});
