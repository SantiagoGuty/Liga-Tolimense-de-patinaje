import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'; // or amplify_outputs.json if you use that
Amplify.configure(awsExports);
