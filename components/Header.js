import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';


const Header = ({ title, showBackButton, onBackPress, accessoryButtons }) => {
  const BackIcon = (props) => <Icon {...props} name='arrow-back' />;
  const theme = useTheme();

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={onBackPress} />
  );

  return (
    <Layout style={{ paddingTop: 30 }}>
      <TopNavigation
        title={() => <Text category="h6">{title}</Text>}
        accessoryLeft={showBackButton ? renderBackAction : null}
        accessoryRight={accessoryButtons}
        style={{
          borderBottomLeftRadius: 10, 
          borderBottomRightRadius: 10, 
          borderBottomWidth: 3,
          borderColor: theme['color-primary-500'], 
        }}
      />
    </Layout>
  );
};

export default Header;
