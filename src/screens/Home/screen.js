import React, { Fragment, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../../components';
import { showToast } from '../../utils';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/actions';

function Index(props) {
  const dispatch = useDispatch();
  return useMemo(() => {
    return (
      <Fragment>
        <Text>Home Screen</Text>
        <TouchableOpacity
          onPress={() => showToast({
            text: 'This is error toast',
            type: 'error',

          })}>
          <Text>Show Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(userLogout())}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </Fragment>
    );
  }, [props])
}


export default Index;
