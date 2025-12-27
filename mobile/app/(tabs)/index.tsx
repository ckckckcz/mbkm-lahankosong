import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { BarChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');
const DATA_STATIC = [
  {
    id: 1,
    title: 'Total Visitors',
    value: '855',
    trend: '+4.8%',
    isPositive: true,
    icon: 'people',
    gradientColors: ['#66BB6A', '#388E3C']
  },
  {
    id: 2,
    title: 'Total Orders',
    value: '658',
    trend: '+2.5%',
    isPositive: true,
    icon: 'basket',
    gradientColors: ['#FFA726', '#FB8C00']
  },
  {
    id: 3,
    title: 'Total Views',
    value: '788',
    trend: '-1.8%',
    isPositive: false,
    icon: 'eye',
    gradientColors: ['#29B6F6', '#039BE5']
  },
  {
    id: 4,
    title: 'Conv. Rate',
    value: '82%',
    trend: '+4.8%',
    isPositive: true,
    icon: 'pie-chart',
    gradientColors: ['#388E3C', '#2E7D32']
  },
];

const WEEKLY_DATA = [
  { value: 40000, label: 'Sun' },
  { value: 65000, label: 'Mon' },
  { value: 50000, label: 'Tue' },
  { value: 60000, label: 'Wed' },
  { value: 75000, label: 'Thu' },
  { value: 60000, label: 'Fri' },
  { value: 70000, label: 'Sat' },
];

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [overviewTab, setOverviewTab] = useState('Weekly');
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#111' : '#F9FAFB' }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/greenfields.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <TouchableOpacity
            style={styles.themeToggle}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Feather name="sun" size={20} color={!isDarkMode ? '#388E3C' : '#9CA3AF'} />
            <Feather name="moon" size={20} color={isDarkMode ? '#388E3C' : '#9CA3AF'} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: isDarkMode ? '#FFF' : '#111' }]}
            placeholder="Search anything..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Ionicons name="filter" size={20} color="#388E3C" />
          </TouchableOpacity>
        </View>

        {/* KPI Grid */}
        <View style={styles.kpiGrid}>
          {DATA_STATIC.map((item) => (
            <View key={item.id} style={[styles.kpiCard, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
              <View style={styles.kpiHeader}>
                <View
                  style={[styles.iconContainer, { backgroundColor: item.gradientColors[0] }]}
                >
                  <Ionicons name={item.icon as any} size={20} color="#FFF" />
                </View>

                <View style={styles.kpiMeta}>
                  <Text style={[styles.kpiValue, { color: isDarkMode ? '#FFF' : '#111' }]}>{item.value}</Text>
                  <Ionicons
                    name={item.isPositive ? "trending-up" : "trending-down"}
                    size={16}
                    color={item.isPositive ? "#388E3C" : "#EF4444"}
                  />
                </View>
              </View>

              <Text style={styles.kpiTitle}>{item.title}</Text>
              <Text style={[styles.kpiTrend, { color: item.isPositive ? "#388E3C" : "#EF4444" }]}>
                {item.trend}
              </Text>
            </View>
          ))}
        </View>

        {/* Overview Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#FFF' : '#111' }]}>Overview</Text>
          <View style={styles.tabSwitch}>
            <TouchableOpacity
              style={[styles.tabButton, overviewTab === 'Weekly' && styles.activeTabButton]}
              onPress={() => setOverviewTab('Weekly')}
            >
              <Text style={[styles.tabText, overviewTab === 'Weekly' && styles.activeTabText]}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, overviewTab === 'Today' && styles.activeTabButton]}
              onPress={() => setOverviewTab('Today')}
            >
              <Text style={[styles.tabText, overviewTab === 'Today' && styles.activeTabText]}>Today</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.chartCard, { backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF' }]}>
          <View style={styles.chartContainer}>
            <BarChart
              data={WEEKLY_DATA}
              barWidth={16}
              spacing={20}
              roundedTop
              roundedBottom
              hideRules
              xAxisThickness={0}
              yAxisThickness={0}
              yAxisTextStyle={{ color: '#9CA3AF', fontSize: 10 }}
              noOfSections={5}
              maxValue={100000}
              frontColor="#388E3C"
              height={200}
              width={width - 100}
              initialSpacing={10}
              yAxisLabelSuffix="K"
              formatYLabel={(value: string) => (parseInt(value) / 1000).toString()}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 140,
    height: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  themeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25, // Pill shape
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  kpiCard: {
    width: (width - 52) / 2,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiMeta: {
    alignItems: 'flex-end',
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  kpiTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  kpiTrend: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabSwitch: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    padding: 4,
    borderRadius: 20,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#111',
    fontWeight: '600',
  },
  chartCard: {
    borderRadius: 24,
    padding: 20,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartContainer: {
    alignItems: 'center',
  }
});
