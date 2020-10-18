import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// When a component does not require state or lifecycle methods,
// make it a functional component like

// We will pass the size prop through our Loading component
// in the screens that use it in: <Loading size={'large'} />
const Loading = ({ size }) => {
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size={size}/>
        </View>
    );
};

const styles = {
    spinnerContainer: {
        // The flex sets our component’s View to its natural fixed width/height on our layout when there is enough space for it, and shrinks our view if there is not.
        flex: -1,
        marginTop: 12,
        marginBottom: 12
    }
};

export { Loading };