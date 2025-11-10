import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { db, auth } from "../../firebaseConfig";
import { collection, getDocs, query, orderBy, Timestamp, doc, getDoc } from "firebase/firestore";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { toSymptomLabels } from "../constants/symptomLabels";

const styles = StyleSheet.create({
    button: {
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#CDD9F6',
        width: "50%",
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
    symptomsMenu: {
        marginBottom:15,
        borderRadius:10,
        margin:15,
        padding: 10,   
        borderBottomWidth:2,
        borderBottomColor:'#ccc',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,     

    }
})
export default function SymptomsScreen() {

    const router = useRouter();
    const today = new Date().toLocaleDateString();
    type ExportEntry = {
        id: string;
        dateISO: string | null;
        symptoms: string[];
        notes: string | null;
        createdAt: Date | null;
    };

    const [exportLoading, setExportLoading] = React.useState(false);
    const [exportRows, setExportRows] = React.useState<ExportEntry[]>([]);

    const escapeHtml = (s: string) =>
        s
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

    const formatDate = (iso: string | null) => {
        if (!iso) return "—";
        try { return new Date(iso).toLocaleDateString(); } catch { return iso; }
    };

    const fetchUserDisplayName = async (uid: string) => {
        try {
            const ref = doc(db, 'users', uid);
            const snap = await getDoc(ref);
            const data: any = snap.exists() ? snap.data() : {};
            return (
                data?.username ||
                data?.displayName ||
                auth.currentUser?.displayName ||
                auth.currentUser?.email ||
                'Unknown'
            );
        } catch {
            return auth.currentUser?.displayName || auth.currentUser?.email || 'Unknown';
        }
    };

    const buildSymptomsHtml = (username: string, rows: ExportEntry[]) => {
        const itemsHtml = rows.map((r) => {
            const dateLabel = formatDate(r.dateISO);
            const labels = toSymptomLabels(r.symptoms);
            const notesHtml = r.notes ? `<p><strong>Notes:</strong> ${escapeHtml(r.notes)}</p>` : '';
            const symptomsHtml = labels.length
                ? `<ul>${labels.map(l => `<li>${escapeHtml(l)}</li>`).join('')}</ul>`
                : '<p><em>No symptoms</em></p>';
            return `
                <section class="entry">
                    <h2>${escapeHtml(dateLabel)}</h2>
                    ${symptomsHtml}
                    ${notesHtml}
                </section>
            `;
        }).join('\n');

        return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Symptom log</title>
    <style>
      body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111; margin: 24px; }
      h1 { text-align:center; font-size: 24px; margin-bottom: 8px; }
      .meta { text-align:center; color:#555; margin-bottom: 24px; }
      .entry { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; margin-bottom: 12px; }
      .entry h2 { font-size: 18px; margin: 0 0 6px 0; }
      ul { margin: 6px 0 10px 20px; }
      li { margin: 2px 0; }
      p { margin: 6px 0; }
      em { color:#666; }
    </style>
  </head>
  <body>
    <h1>Symptom log</h1>
    <div class="meta">User: ${escapeHtml(username)}</div>
    ${itemsHtml || '<p><em>No entries found.</em></p>'}
  </body>
</html>`;
    };

    const handleShareSymptoms = async () => {
        const user = auth.currentUser;
        if(!user) {
            alert("You must be logged in to share your symptoms.");
            return;
        }
        const userId = user.uid;

        const symptomsRef = collection(db, 'users', userId, 'symptoms');
        const q = query(symptomsRef, orderBy('date', 'desc'));
        setExportLoading(true);
        try {
            const snap = await getDocs(q);
            const rows: ExportEntry[] = snap.docs.map((d) => {
                const data: any = d.data();
                const createdAt = data?.createdAt instanceof Timestamp ? data.createdAt.toDate() : null;
                return {
                    id: d.id,
                    dateISO: typeof data?.date === 'string' ? data.date : null,
                    symptoms: Array.isArray(data?.symptoms) ? data.symptoms : [],
                    notes: data?.notes ?? null,
                    createdAt,
                };
            });
            setExportRows(rows);
            const username = await fetchUserDisplayName(userId);
            const html = buildSymptomsHtml(username, rows);
            // Generate PDF and share immediately
            const { uri } = await Print.printToFileAsync({ html });
            const canShare = await Sharing.isAvailableAsync();
            if (!canShare) {
                alert('Sharing not available on this device. PDF saved locally at:\n' + uri);
            } else {
                await Sharing.shareAsync(uri, { UTI: 'com.adobe.pdf', mimeType: 'application/pdf' });
            }
        } catch (e: any) {
            console.error('Export fetch error:', e);
            alert(e?.message || 'Failed to load symptoms.');
        } finally {
            setExportLoading(false);
        }

    }

    return (
        <ScrollView>

            <View style={{marginLeft: 15, marginTop:15, marginBottom:10}}>
            <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 10}}>Hi there!</Text>
            <Text style={{fontWeight:'bold', fontSize: 30}}>Today: {today}</Text>
            </View>

            <View style={{alignItems:'center', marginTop:20, marginBottom:20}}>
                <View style={{borderRadius: 200, height: 200, width: 200, backgroundColor:'orange'}}></View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/symptomsForm')}><Text style={{fontWeight:'bold'}}>LOG SYMPTOMS</Text></TouchableOpacity>
            </View>

            <View style={{marginTop:20}}>
            <TouchableOpacity style={styles.symptomsMenu} onPress={() => router.push('../pastEntries/entriesList')}>
                <Text style={{fontWeight:'bold', fontSize: 20}}>View Past Entries</Text></TouchableOpacity>
            <TouchableOpacity style={styles.symptomsMenu} onPress={handleShareSymptoms} disabled={exportLoading}>
                <Text style={{fontWeight:'bold', fontSize:20}}>{exportLoading ? 'Preparing…' : 'Download/Share Symptoms'}</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}