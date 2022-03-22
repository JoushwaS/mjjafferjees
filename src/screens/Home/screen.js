import React, { Fragment, useMemo } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '../../components';
import { showToast } from '../../utils';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/actions';

function Index(props) {
  const dispatch = useDispatch();
  return useMemo(() => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Home Screen</Text>
        {Array.from({ length: 40 }).map(() => <Text>Home Screen</Text>)}
        <TouchableOpacity
          onPress={() => showToast({
            text: 'This is error toast',
            type: 'error',

          })}>
          <Text>Show Toast</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }, [props])
}


export default Index;
