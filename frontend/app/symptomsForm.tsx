import { ScrollView, Text, TouchableOpacity, View} from "react-native";
import { useRouter } from "expo-router";

export default function SymptomsForm() {

    const router = useRouter();
    return (        
        <ScrollView style={{flex:1, marginTop:100}} contentContainerStyle={{alignItems:'center'}} >
            <View>
            <Text>Symptoms Form</Text>
            
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ fontWeight: 'bold', marginTop: 20, fontSize: 20}}>CANCEL</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    )};