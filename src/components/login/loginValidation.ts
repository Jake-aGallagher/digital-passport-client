import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    username: yup.string().required().max(255),
    password: yup.string().required().max(255),
});

export const yupResolverLogin = yupResolver(formValidation);
