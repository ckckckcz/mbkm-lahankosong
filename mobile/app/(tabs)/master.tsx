import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TABS = ['Groups', 'Shifts', 'Production Lines'];
const GROUPS_DATA = [
    { id: '1', name: 'Group A', status: 'Aktif' },
    { id: '2', name: 'Group B', status: 'Tidak Aktif' },
    { id: '3', name: 'Group C', status: 'Aktif' },
];

const SHIFTS_DATA = [
    { id: '1', name: 'Morning Shift', start_time: '06:00', end_time: '14:00', status: 'Aktif' },
    { id: '2', name: 'Afternoon Shift', start_time: '14:00', end_time: '22:00', status: 'Aktif' },
    { id: '3', name: 'Night Shift', start_time: '22:00', end_time: '06:00', status: 'Aktif' },
];

const LINES_DATA = [
    { id: '1', name: 'Line 1', status: 'Aktif' },
    { id: '2', name: 'Line 2', status: 'Tidak Aktif' },
    { id: '3', name: 'Line 3', status: 'Aktif' },
];

const renderBadge = (status: string) => {
    let bg = '#E0F2FE';
    let text = '#0284C7';

    if (status === 'Aktif') {
        bg = '#DCFCE7';
        text = '#15803D';
    } else if (status === 'Tidak Aktif') {
        bg = '#FEE2E2';
        text = '#B91C1C';
    }

    return (
        <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color: text }]}>{status}</Text>
        </View>
    );
};

export default function MasterDataScreen() {
    const [activeTab, setActiveTab] = useState('Groups');

    const getData = () => {
        switch (activeTab) {
            case 'Groups': return GROUPS_DATA;
            case 'Shifts': return SHIFTS_DATA;
            case 'Production Lines': return LINES_DATA;
            default: return [];
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Master Data</Text>
                    <Text style={styles.headerSubtitle}>Manage your reference data</Text>
                </View>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                {TABS.map(tab => {
                    const isActive = activeTab === tab;
                    return (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabButton, isActive && styles.activeTabButton]}
                            onPress={() => setActiveTab(tab)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.contentHeader}>
                <Text style={styles.sectionTitle}>{activeTab} List</Text>
                <Text style={styles.itemCount}>{getData().length} items</Text>
            </View>

            <FlatList
                data={getData()}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: { item: any }) => (
                    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                        <View style={styles.cardHeader}>
                            <View style={styles.iconContainer}>
                                <Ionicons
                                    name={activeTab === 'Groups' ? 'people' : activeTab === 'Shifts' ? 'time' : 'layers'}
                                    size={20}
                                    color="#388E3C"
                                />
                            </View>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            {/* Status Badge moved to top right or inline */}
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.cardFooter}>
                            {activeTab === 'Shifts' && (
                                <View style={styles.infoRow}>
                                    <Ionicons name="time-outline" size={14} color="#6B7280" />
                                    <Text style={styles.infoText}>{item.start_time} - {item.end_time}</Text>
                                </View>
                            )}
                            <View style={styles.statusContainer}>
                                {renderBadge(item.status)}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    addButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#388E3C', // Greenfields green
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#388E3C",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#E5E7EB',
        borderRadius: 12,
        marginHorizontal: 24,
        marginTop: 16,
        padding: 4,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTabButton: {
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#6B7280',
    },
    activeTabText: {
        color: '#388E3C',
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 24,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#374151',
    },
    itemCount: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#ECFDF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    infoText: {
        fontSize: 13,
        color: '#6B7280',
        fontWeight: '500',
    },
    statusContainer: {
        marginLeft: 'auto',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
});
