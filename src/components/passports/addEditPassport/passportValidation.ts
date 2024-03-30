import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const formValidation = yup.object().shape({
    passportName: yup.string().required().max(255),
    locked: yup.boolean(),
});

export const yupResolverPassport = yupResolver(formValidation);
