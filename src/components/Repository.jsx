import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
//useRepo




// const Repository = () => {
//   const { id } = useParams();
//   const { repository  } = useRepository({ id });
//   if (!repository) return null;



// };

// export default Repository;

const RepositoryInfo = ({ repository }) => {
return (
        <View>
         <RepositoryItem repository={repository} isAPage/>
        </View>
     );
  };
  
  const ReviewItem = ({ review }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    containerRating: {
      borderColor: theme.colors.secondary,
      borderWidth: 2,
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      margin: 15,
      padding: 11,
      alignItems: 'center',
    },
    containerBody: {
      width: '75%',
      margin: 15,
      marginLeft: 0,
    },
    containerTitle: {
      marginVertical: 5,
    },
    textRating: {
      color: theme.colors.secondary,
      fontSize: theme.fontSizes.subheading,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.bold,
    },
    textName: {
      color: 'black',
      fontSize: theme.fontSizes.subheading,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.bold,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerRating}>
        <Text style={styles.textRating}>{review.rating}</Text>
      </View>
      <View style={styles.containerBody}>
        <View style={styles.containerTitle}>
          <Text style={styles.textName}>{review.user.username}</Text>
          <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
        <Text color='primary'>{review.text}</Text>
      </View>
    </View>
  );
};
  
  const SingleRepository = () => {
    const { id } = useParams();
    const { repository } = useRepository({ id });

    if (!repository) return null;

    const styles = StyleSheet.create({
      separator: {
      height: 10,
      backgroundColor: 'gray'
     },
    });

    const reviews = repository.reviews.edges
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];
  
    return (
      <FlatList
        data={reviews}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        // ...
      />
    );
  };
  
  export default SingleRepository;