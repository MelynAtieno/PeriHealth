import { Button } from "@react-navigation/elements";
import React from "react";
import { View, Text } from "react-native";

export default function ProfileScreen() {
    return (
        <View>
            <Text>Your Profile</Text>
            <Button onPress={() => {}}>Logout</Button>
        </View>
    )
}