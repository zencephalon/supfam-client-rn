import * as Linking from 'expo-linking';

export default function callPhone(phone: string) {
	Linking.openURL(`tel:${phone}`);
}
