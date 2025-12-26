import { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withDelay,
    withTiming,
    runOnJS
} from 'react-native-reanimated';

export default function SplashScreen() {
    const router = useRouter();
    const opacity = useSharedValue(1); // Start visible

    useEffect(() => {
        // Navigate to onboarding after delay
        const timeout = setTimeout(() => {
            opacity.value = withTiming(0, { duration: 500 }, () => {
                runOnJS(router.replace)('/onboarding');
            });
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, animatedStyle]}>
                <Image
                    source={require('@/assets/images/greenfields.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#388E3C',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: '100%',
        tintColor: '#fff',
    },
});
