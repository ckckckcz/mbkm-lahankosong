import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MOCK_DATA = [
    { id: '1', date: '2023-10-26', group_name: 'Group A', shift_name: 'Morning', line_name: 'Line 1', temperature: 85.50, weight: 12.50, quality: 'OK', input_method: 'Manual' },
    { id: '2', date: '2023-10-26', group_name: 'Group B', shift_name: 'Afternoon', line_name: 'Line 2', temperature: 90.20, weight: 11.80, quality: 'NOT OK', input_method: 'OCR' },
    { id: '3', date: '2023-10-27', group_name: 'Group C', shift_name: 'Night', line_name: 'Line 1', temperature: 84.00, weight: 12.60, quality: 'OK', input_method: 'Manual' },
    { id: '4', date: '2023-10-27', group_name: 'Group A', shift_name: 'Morning', line_name: 'Line 3', temperature: 88.50, weight: 12.10, quality: 'OK', input_method: 'OCR' },
];

const renderBadge = (quality: string) => {
    let bg = '#E0F2FE';
    let text = '#0284C7';

    if (quality === 'OK') {
        bg = '#DCFCE7';
        text = '#15803D';
    } else if (quality === 'NOT OK') {
        bg = '#FEE2E2';
        text = '#B91C1C';
    }

    return (
        <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color: text }]}>{quality}</Text>
        </View>
    );
};

export default function OperationScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Operations</Text>
                    <Text style={styles.headerSubtitle}>Monitor daily production</Text>
                </View>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Filter Slider (Horizontal Scroll) */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
                    {['All', 'Today', 'This Week', 'OK', 'Not OK'].map((filter, index) => (
                        <TouchableOpacity key={filter} style={[styles.filterChip, index === 1 && styles.activeFilterChip]}>
                            <Text style={[styles.filterText, index === 1 && styles.activeFilterText]}>{filter}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Main Table Content - Horizontal Slider for Columns */}
            <ScrollView style={styles.mainScrollView} horizontal={false} showsVerticalScrollIndicator={false}>
                <View style={styles.tableContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View>
                            {/* Table Header */}
                            <View style={styles.tableHeader}>
                                <Text style={[styles.headerCol, { width: 100 }]}>Date</Text>
                                <Text style={[styles.headerCol, { width: 100 }]}>Line</Text>
                                <Text style={[styles.headerCol, { width: 100 }]}>Shift</Text>
                                <Text style={[styles.headerCol, { width: 100 }]}>Group</Text>
                                <Text style={[styles.headerCol, { width: 120, textAlign: 'right' }]}>Values</Text>
                                <Text style={[styles.headerCol, { width: 100, textAlign: 'center' }]}>Qual.</Text>
                            </View>

                            {/* Table Rows */}
                            {MOCK_DATA.map((item) => (
                                <View key={item.id} style={styles.row}>
                                    <Text style={[styles.cellText, { width: 100, color: '#6B7280' }]}>{item.date}</Text>

                                    <View style={{ width: 100 }}>
                                        <Text style={styles.cellTextPrimary}>{item.line_name}</Text>
                                    </View>

                                    <View style={{ width: 100 }}>
                                        <Text style={styles.cellText}>{item.shift_name}</Text>
                                    </View>

                                    <View style={{ width: 100 }}>
                                        <Text style={styles.cellText}>{item.group_name}</Text>
                                    </View>

                                    <View style={{ width: 120, alignItems: 'flex-end' }}>
                                        <Text style={[styles.cellText, { fontSize: 13 }]}>
                                            <Text style={{ color: '#9CA3AF' }}>T:</Text> {item.temperature}°c
                                        </Text>
                                        <Text style={[styles.cellText, { fontSize: 13 }]}>
                                            <Text style={{ color: '#9CA3AF' }}>W:</Text> {item.weight}kg
                                        </Text>
                                    </View>

                                    <View style={{ width: 100, alignItems: 'center' }}>
                                        {renderBadge(item.quality)}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
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
        paddingBottom: 12,
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
    filterContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    filterContent: {
        paddingHorizontal: 24,
        gap: 12,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeFilterChip: {
        backgroundColor: '#ECFDF5',
        borderColor: '#388E3C',
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    activeFilterText: {
        color: '#388E3C',
        fontWeight: '600',
    },
    mainScrollView: {
        flex: 1,
    },
    tableContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 16,
        marginHorizontal: 0, // Full width for scroll
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: '#F9FAFB',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerCol: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    cellText: {
        fontSize: 14,
        color: '#4B5563',
    },
    cellTextPrimary: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
    },
});
