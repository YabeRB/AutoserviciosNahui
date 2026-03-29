import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity,
    Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { AppColors } from '../theme/Colors'; 

export default function WelcomeScreen({ navigation }) {
    const [carTapCount, setCarTapCount] = useState(0);

    const handleCarTap = () => {
        const newCount = carTapCount + 1;
        setCarTapCount(newCount);
        
        if (newCount >= 5) {
            setCarTapCount(0);
            Alert.alert("Secreto", "¡Encontraste el menú de configuración!"); 
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleCarTap} activeOpacity={0.7} style={styles.iconPadding}>
                        <MaterialIcons name="directions-car" size={24} color={AppColors.accentBlue} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Autoservicios Ñahui</Text>
                    <MaterialIcons name="help-outline" size={24} color={AppColors.textSecondary} />
                </View>

                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=1000&auto=format&fit=crop' }} 
                        style={styles.image} 
                    />
                </View>

                <Text style={styles.title}>Bienvenido a</Text>
                <Text style={styles.titleAccent}>Autoservicios Ñahui</Text>
                
                <Text style={styles.subtitle}>
                    Gestiona servicios para tu vehículo de{'\n'}forma rápida y segura
                </Text>

                <View style={styles.spacer} />

                <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <MaterialIcons name="login" size={20} color={AppColors.white} style={styles.buttonIcon} />
                    <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.outlineButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <MaterialIcons name="person-add" size={20} color={AppColors.white} style={styles.buttonIcon} />
                    <Text style={styles.outlineButtonText}>Registrarse</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.guestText}>Continuar como invitado</Text>
                </TouchableOpacity>
                
                <Text style={styles.footerText}>POTENCIADO POR ÑAHUI TECH</Text>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.background,
    },
    container: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
    iconPadding: {
        padding: 8,
    },
    headerText: {
        flex: 1,
        color: AppColors.white,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    imageContainer: {
        height: 180,
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        color: AppColors.white,
        fontSize: 26,
        fontWeight: 'bold',
    },
    titleAccent: {
        color: AppColors.accentBlue,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        color: AppColors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
    },
    spacer: {
        flex: 1,
    },
    primaryButton: {
        backgroundColor: AppColors.primaryBlue,
        width: '100%',
        height: 60,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    primaryButtonText: {
        color: AppColors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    outlineButton: {
        borderWidth: 1.5,
        borderColor: AppColors.inputFill,
        width: '100%',
        height: 60,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    outlineButtonText: {
        color: AppColors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonIcon: {
        marginRight: 8,
    },
    guestText: {
        color: AppColors.textSecondary,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    footerText: {
        color: '#4B516D',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1.5,
    },
});