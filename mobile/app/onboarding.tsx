import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    FadeInUp,
    SlideInRight,
    SlideOutLeft,
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
    interpolate,
    Extrapolation
} from 'react-native-reanimated';
import { useState } from 'react';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const onboardingData = [
    {
        id: 1,
        title: "Monitoring made simple",
        subtitle: "Real-time production, quality, and input data at your fingertips.",
        image: null,
    },
    {
        id: 2,
        title: "Tailored for your operation needs.",
        subtitle: "",
        image: require('@/assets/images/onboarding-2.png'),
    },
    {
        id: 3,
        title: "Your production made simple",
        subtitle: "Connect with your entire plant operations seamlessly.",
        image: require('@/assets/images/greenfields.png'),
        isCard: true,
    }
];

const BUTTON_HEIGHT = 72;
const BUTTON_WIDTH = width - 60; // Padding horizontal 30 * 2
const KNOB_SIZE = 56;
const PADDING = 8;
const MAX_TRANSLATE = BUTTON_WIDTH - KNOB_SIZE - PADDING * 2;

export default function OnboardingScreen() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Swipe Logic
    const translateX = useSharedValue(0);
    const isNavigating = useSharedValue(false);

    const handleNext = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            router.replace('/login');
        }
    };

    const onSlideComplete = () => {
        handleNext();
        // Reset for next time if we were staying on same screen (not the case here, but good practice)
        translateX.value = 0;
    };

    const panGesture = Gesture.Pan()
        .onChange((event) => {
            if (currentIndex !== onboardingData.length - 1) return; // Only for last slide
            if (isNavigating.value) return;

            translateX.value = Math.max(0, Math.min(event.translationX, MAX_TRANSLATE));
        })
        .onEnd(() => {
            if (currentIndex !== onboardingData.length - 1) return;

            if (translateX.value > MAX_TRANSLATE * 0.7) {
                isNavigating.value = true;
                translateX.value = withSpring(MAX_TRANSLATE, { damping: 12 }, () => {
                    runOnJS(onSlideComplete)();
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animatedKnobStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                translateX.value,
                [0, MAX_TRANSLATE / 2],
                [1, 0],
                Extrapolation.CLAMP
            )
        };
    });

    const animatedChevronStyle = (index: number) => useAnimatedStyle(() => {
        const delay = index * 10;
        return {
            opacity: interpolate(
                translateX.value,
                [0, MAX_TRANSLATE * 0.5],
                [0.5 + (index * 0.2), 0],
                Extrapolation.CLAMP
            ),
            transform: [{
                translateX: interpolate(
                    translateX.value,
                    [0, MAX_TRANSLATE],
                    [0, MAX_TRANSLATE / 2],
                    Extrapolation.CLAMP
                )
            }]
        };
    });


    const activeItem = onboardingData[currentIndex];
    // Reset knob when index changes just in case
    if (currentIndex !== onboardingData.length - 1) {
        translateX.value = 0;
        isNavigating.value = false;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                {/* Top Content (Logo & Text) */}
                <Animated.View
                    key={`text-${currentIndex}`}
                    entering={SlideInRight}
                    exiting={SlideOutLeft}
                    style={styles.contentContainer}
                >
                    <Image
                        source={require('@/assets/images/greenfields.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <View>
                        <Text style={styles.title}>{activeItem.title}</Text>
                        {activeItem.subtitle ? (
                            <Text style={styles.description}>{activeItem.subtitle}</Text>
                        ) : null}
                    </View>
                </Animated.View>

                {/* Middle/Bottom Image */}
                <View style={styles.imageContainer}>
                    {activeItem.image && (
                        <>
                            {activeItem.isCard && (
                                <Animated.View
                                    key={`bg-card-${currentIndex}`}
                                    entering={FadeInUp.delay(100).springify()}
                                    style={styles.cardBackground}
                                />
                            )}
                            <Animated.View
                                key={`img-${currentIndex}`}
                                entering={FadeInUp.delay(200).springify()}
                                style={activeItem.isCard ? styles.cardImageWrapper : styles.fullImageWrapper}
                            >
                                {activeItem.isCard ? (
                                    <View style={styles.networkContainer}>
                                        {/* Orbits */}
                                        <View style={styles.orbitRingLarge} />
                                        <View style={styles.orbitRingMedium} />

                                        {/* Center Node */}
                                        <View style={styles.centerNode}>
                                            <Image
                                                source={activeItem.image}
                                                style={styles.centerLogo}
                                                resizeMode="contain"
                                            />
                                        </View>

                                        {/* Satellite Nodes - Spaced further out */}
                                        {/* Top Right */}
                                        <View style={[styles.satelliteNode, { top: '15%', right: '15%' }]}>
                                            <Ionicons name="person" size={24} color="#555" />
                                        </View>
                                        {/* Bottom Left */}
                                        <View style={[styles.satelliteNode, { bottom: '20%', left: '10%' }]}>
                                            <Ionicons name="construct" size={24} color="#555" />
                                        </View>
                                        {/* Top Left */}
                                        <View style={[styles.satelliteNode, { top: '20%', left: '15%' }]}>
                                            <Ionicons name="bar-chart" size={24} color="#555" />
                                        </View>
                                        {/* Bottom Right */}
                                        <View style={[styles.satelliteNode, { bottom: '15%', right: '10%' }]}>
                                            <Ionicons name="leaf" size={24} color="#555" />
                                        </View>

                                        {/* Glass Overlay */}
                                        <View style={styles.glassOverlay} />
                                    </View>
                                ) : (
                                    <Image
                                        source={activeItem.image}
                                        style={styles.mainImage}
                                        resizeMode="cover"
                                    />
                                )}
                            </Animated.View>
                        </>
                    )}
                </View>

                {/* Bottom Navigation */}
                <View style={styles.footer}>
                    {currentIndex === onboardingData.length - 1 ? (
                        <GestureDetector gesture={panGesture}>
                            <View style={styles.sliderTrack}>
                                <View style={styles.sliderBackgroundContent}>
                                    <View style={{ flex: 1 }} />
                                    <Animated.View style={[styles.chevronsContainer, animatedTextStyle]}>
                                        <Ionicons name="chevron-forward" size={24} color="#fff" style={{ opacity: 0.3 }} />
                                        <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: -12, opacity: 0.6 }} />
                                        <Ionicons name="chevron-forward" size={24} color="#fff" style={{ marginLeft: -12, opacity: 1 }} />
                                    </Animated.View>
                                    <View style={{ flex: 1 }} />
                                </View>

                                {/* Draggable Knob */}
                                <Animated.View style={[styles.sliderKnob, animatedKnobStyle]}>
                                    <Ionicons name="arrow-forward" size={24} color="#388E3C" />
                                </Animated.View>
                            </View>
                        </GestureDetector>
                    ) : (
                        // Normal Next Button
                        <Pressable onPress={handleNext} style={styles.nextButton}>
                            <Ionicons name="chevron-forward" size={32} color="#fff" />
                            <Ionicons name="chevron-forward" size={32} color="#fff" style={{ marginLeft: -15 }} />
                            <Ionicons name="chevron-forward" size={32} color="#fff" style={{ marginLeft: -15 }} />
                        </Pressable>
                    )}
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#388E3C',
    },
    contentContainer: {
        paddingHorizontal: 24,
        paddingTop: 20,
        zIndex: 10,
    },
    logo: {
        width: 120,
        height: 120,
        tintColor: '#fff',
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 18,
        color: '#E8F5E9',
        lineHeight: 26,
        maxWidth: '80%',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 0,
    },
    fullImageWrapper: {
        width: width,
        height: height * 0.5,
        justifyContent: 'flex-end',
    },
    // New Card Styles
    cardImageWrapper: {
        width: width * 0.8,
        aspectRatio: 1,
        marginBottom: 120, // Reduced spacing
        borderRadius: 40,
        backgroundColor: '#fff',
        padding: 0, // Reset padding
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 30,
        elevation: 15,
        transform: [{ rotate: '-8deg' }], // Slight tilt like reference
        overflow: 'hidden',
    },
    cardBackground: {
        position: 'absolute',
        width: width * 0.8,
        aspectRatio: 1,
        marginBottom: 120, // Reduced spacing
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.2)', // Semi-transparent
        transform: [{ rotate: '-18deg' }], // More rotated
        zIndex: -1, // Behind
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    // Network Card Components
    networkContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orbitRingLarge: {
        position: 'absolute',
        width: width * 0.65,
        height: width * 0.65,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    orbitRingMedium: {
        position: 'absolute',
        width: width * 0.45,
        height: width * 0.45,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    centerNode: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    centerLogo: {
        width: 50,
        height: 50,
    },
    // Satellite Nodes (Simulated avatars)
    satelliteNode: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTextContainer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        zIndex: 30,
    },
    cardText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
        lineHeight: 28,
        width: '70%',
    },
    // Glass Effect on Right
    glassOverlay: {
        position: 'absolute',
        right: -30,
        top: '15%',
        width: 80,
        height: '70%',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
        zIndex: 5,
    },
    // Footer & Slider
    footer: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        left: 30,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    nextButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    sliderTrack: {
        width: '100%',
        height: BUTTON_HEIGHT,
        backgroundColor: '#000',
        borderRadius: BUTTON_HEIGHT / 2,
        justifyContent: 'center',
        padding: PADDING,
    },
    sliderBackgroundContent: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 32,
    },
    chevronsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sliderKnob: {
        width: KNOB_SIZE,
        height: KNOB_SIZE,
        borderRadius: KNOB_SIZE / 2,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    }
});
