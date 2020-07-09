import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import PropTypes from 'prop-types';

import { restaurantPropTypes } from '~/types';
import { Colors, Spacing, Typography } from '~/styles';

const styles = StyleSheet.create({
  cuisine: {
    marginTop: Spacing.small,
    fontSize: Typography.baseFontSize,
  },
  container: {
    margin: Spacing.xsmall,
    backgroundColor: Colors.white,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 100,
    margin: Spacing.small,
    borderRadius: 10,
  },
  name: {
    ...Typography.bodyText,
    margin: Spacing.small,
    fontFamily: 'lora-bold',
  },
  swiper: {
    height: 160,
  },
  slide: {
    flexDirection: 'row',
  },
});

const FavRestaurants = ({ item: restaurants }) => {
  let gridSection = [];

  const favDataGrid = restaurants.reduce(
    (allRestaurants, currentRestaurant, index) => {
      if (gridSection.length === 2) {
        allRestaurants.push(gridSection);
        gridSection = [];
      }

      const isLastItem = restaurants.length - 1 === index;

      if (isLastItem) {
        if (gridSection.length === 1) {
          gridSection.push(currentRestaurant);
          allRestaurants.push(gridSection);
        } else {
          allRestaurants.push([currentRestaurant]);
        }
      } else {
        gridSection.push(currentRestaurant);
      }

      return allRestaurants;
    },
    []
  );

  return (
    <Swiper showsPagination={false} style={styles.swiper}>
      {favDataGrid.map(section => {
        const [firstRestaurant, secondRestaurant] = section;

        return (
          <View style={styles.slide} key={firstRestaurant.place_id}>
            <View style={styles.container} key={firstRestaurant.place_id}>
              <Image source={firstRestaurant.image} style={styles.image} />
              <Text style={styles.name}>{firstRestaurant.name}</Text>
            </View>
            {secondRestaurant && (
              <View style={styles.container} key={secondRestaurant.place_id}>
                <Image source={secondRestaurant.image} style={styles.image} />
                <Text style={styles.name}>{secondRestaurant.name}</Text>
              </View>
            )}
          </View>
        );
      })}
    </Swiper>
  );
};

FavRestaurants.propTypes = {
  item: PropTypes.arrayOf(restaurantPropTypes).isRequired,
};

export default FavRestaurants;
