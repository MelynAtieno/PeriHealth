import React from 'react';
import { auth, db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';



type Entry = {
    id: string;
    dateISO?: string;
    createdAt?: number | null;
    symptoms: string[];
    notes?: string | null;
};

export default function PastEntriesList() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [entries, setEntries] = React.useState<Entry[]>([]);

    React.useEffect(() => {
        const user = auth.currentUser;
        if (!user) { setLoading(false); return; }
        const q = query(
            collection(db, 'users', user.uid, 'symptoms'),
            orderBy('createdAt', 'desc')
        );
        const unsub = onSnapshot(
            q,
            (snap) => {
                const list: Entry[] = snap.docs.map(d => {
                    const data: any = d.data();
                        const createdAtMs = data?.createdAt instanceof Timestamp ? data.createdAt.toDate().getTime() : null;
                        return {
                            id: d.id,
                            dateISO: data?.date,
                            createdAt: createdAtMs,
                            symptoms: Array.isArray(data?.symptoms) ? data.symptoms : [],
                            notes: data?.notes ?? null,
                        };
                });
                setEntries(list);
                setLoading(false);
            },
            (err) => { console.error('Fetch entries error:', err); setLoading(false); }
        );
        return () => unsub();
    }, []);

    const user = auth.currentUser;
    if (!user) {
        return <View style={styles.center}><Text>Please log in to view your past entries.</Text></View>;
    }
    if (loading) {
        return <View style={styles.center}><ActivityIndicator /><Text style={{marginTop:8}}>Loading entries…</Text></View>;
    }
        if (entries.length === 0) {
            return (
                <View style={{ flex:1, paddingTop:40, paddingHorizontal:16 }}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
                            <Text style={{ fontWeight: 'bold' }}>GO BACK</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>Past Entries</Text>
                    </View>
                    <View style={[styles.center, {marginTop:24}] }>
                        <Text style={styles.headerText}>Past Entries will be displayed here.</Text>
                        <Text style={{marginTop:8}}>No entries yet.</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={{ flex:1, paddingTop:40, paddingHorizontal:16 }}>
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
                        <Text style={{ fontWeight: 'bold' }}>GO BACK</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Past Entries</Text>
                </View>
                <Text style={styles.headerText}>Past Entries will be displayed here.</Text>
                <FlatList
                    data={entries}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom:24 }}
                    renderItem={({ item }) => {
                        const dateLabel = item.dateISO ? new Date(item.dateISO).toLocaleDateString() : item.id;
                        const preview = item.symptoms.slice(0, 2).join(', ');
                        const extra = item.symptoms.length > 2 ? ` +${item.symptoms.length - 2} more` : '';
                        return (
                            <Pressable style={styles.row} onPress={() => router.push(`/pastEntries/${item.id}` as any)}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.rowTitle}>{dateLabel}</Text>
                                    {item.symptoms.length > 0 ? (
                                        <Text style={styles.rowSubtitle} numberOfLines={1}>{preview}{extra}</Text>
                                    ) : (
                                        <Text style={styles.rowSubtitle}>(no symptoms)</Text>
                                    )}
                                    {item.notes ? <Text style={styles.notes} numberOfLines={1}>{item.notes}</Text> : null}
                                </View>
                                <Text style={styles.chevron}>›</Text>
                            </Pressable>
                        );
                    }}
                />
            </View>
        );
    }

    


const styles = StyleSheet.create({
    center: { flex:1, alignItems:'center', justifyContent:'center', paddingHorizontal:16 },
    headerRow: { flexDirection:'row', alignItems:'center', justifyContent:'space-between' },
    title: { fontSize:20, fontWeight:'700' },
    headerText: { marginTop:8, color:'#555' },
    goBackButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#8e8f90ff',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    rowTitle: { fontSize:16, fontWeight:'600', marginBottom:4 },
    rowSubtitle: { fontSize:14, color:'#555' },
    notes: { marginTop:4, fontSize:12, color:'#777' },
    chevron: { fontSize:24, color:'#999', marginLeft:8 }
});