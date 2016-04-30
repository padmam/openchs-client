import React, { Component, StyleSheet, View } from 'react-native';
import SettingsFormField from './SettingsFormField';

class SettingsForm extends Component {

    static propTypes = {
        onServerURLChanged: React.PropTypes.func.isRequired,
        settings: React.PropTypes.object.isRequired,
    };

    static styles = StyleSheet.create({
        form: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: 20,
            marginRight: 20,
        },
    });

    render() {
        return (
            <View style={SettingsForm.styles.form}>
                <SettingsFormField
                    onChangeText={this.props.onServerURLChanged}
                    defaultValue={this.props.settings.serverURL}
                    />
            </View>
        );
    }
}


export default SettingsForm;