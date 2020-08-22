import * as React from 'react';
import VerifyResetCodeFlow from '~/c/VerifyResetCodeFlow';
import PasswordResetForm from '~/c/PasswordResetForm';

const ResetFlow: React.FunctionComponent = ({ navigation, route }) => {
	const { token } = route.params;

	return (
		<VerifyResetCodeFlow
			token={token}
			render={() => {
				return <PasswordResetForm token={token} />;
			}}
		/>
	);
};

export default ResetFlow;
