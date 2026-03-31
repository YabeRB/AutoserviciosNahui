import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function RoleSelectionScreen({ navigation }) {
    
    const RoleCard = ({ icon, title, subtitle, iconBgColor, cardColor, onPress }) => (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={[styles.card, { backgroundColor: cardColor }]}
            onPress={onPress}
        >
            <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
                <MaterialIcons name={icon} size={28} color="#FFFFFF" />
            </View>
            <View style={styles.textWrapper}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#6E78D6" />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Autoservicios Ñahui</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.spacer} />

                <Text style={styles.overline}>SELECCIÓN DE ACCESO</Text>
                <Text style={styles.mainTitle}>¿Qué eres?</Text>
                <View style={styles.divider} />

                <View style={styles.cardsContainer}>
                    <RoleCard 
                        icon="admin-panel-settings"
                        title="Administrador"
                        subtitle="Gestión total y analíticas"
                        iconBgColor="#1D2469"
                        cardColor="#161B2E"
                        onPress={() => Alert.alert("Accediendo", "Iniciando como Administrador...")}
                    />

                    <RoleCard 
                        icon="manage-accounts"
                        title="Empleado"
                        subtitle="Operaciones y servicios técnicos"
                        iconBgColor="#454961"
                        cardColor="#1A1C29"
                        onPress={() => {
                            Alert.alert("Accediendo", "Yendo a Hoja de Ingreso...");
                        }}
                    />
                </View>

                <View style={styles.spacer} />

                <Text style={styles.footerText}>Sistema de Gestión de Precisión v2.0</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#10121D',
    },
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    appBarTitle: {
        color: '#6E78D6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    spacer: {
        flex: 1,
    },
    overline: {
        color: '#6E78D6',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 2.0,
        marginBottom: 12,
    },
    mainTitle: {
        color: '#FFFFFF',
        fontSize: 44,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    divider: {
        width: 50,
        height: 4,
        backgroundColor: '#3844C7',
        borderRadius: 2,
        marginBottom: 56,
    },
    cardsContainer: {
        width: '100%',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconWrapper: {
        padding: 16,
        borderRadius: 16,
        marginRight: 20,
    },
    textWrapper: {
        flex: 1,
    },
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        color: '#8B8E9F',
        fontSize: 13,
    },
    footerText: {
        color: '#5B627A',
        fontSize: 12,
        marginBottom: 24,
    },
});