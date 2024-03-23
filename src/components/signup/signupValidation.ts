import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    companyName: yup.string().required().max(255),
    username: yup.string().required().max(255),
    email: yup.string().email().required().max(255),
    password: yup.string().required().max(255),
    retryPassord: yup.string().required().max(255).oneOf([yup.ref('password')], 'Passwords must match')
});

export const yupResolverSignup = yupResolver(formValidation);
