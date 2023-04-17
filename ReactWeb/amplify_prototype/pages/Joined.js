import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import RenderItem from '../components/RenderItem';

const Joined = () => {
  const tableData = new Array(10).fill({});
  const tableItemHeight = 150;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, styles.titleContent]}>My Joined Games</Text>
        <Text style={[styles.title, styles.titleContent]}>(3)</Text>
      </View>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 25, paddingTop: 25 }}showsVerticalScrollIndicator={false}>
          <View style={{ height: 500 }}>
            <FlatList
              data={tableData}
              renderItem={RenderItem}
              ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
              getItemLayout={(_, index) => ({
                length: '100%',
                offset: (tableItemHeight + 25) * index,
                index,
              })}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  titleContainer: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingtop: 10,
    backgroundColor: '#AAFFA7',
  },
  titleContent: {
    top: 20,
  },
  content: {
      flex: 0.88,
      borderTopWidth: 3,
      borderColor: 'black',
      backgroundColor: 'white',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  
});

export default Joined;
