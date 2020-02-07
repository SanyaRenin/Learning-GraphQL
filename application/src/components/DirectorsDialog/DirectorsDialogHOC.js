import { compose } from 'recompose';
import {graphql} from 'react-apollo/lib/index'

import {directorsQuery} from '../DirectorsTable/queries'
import { deleteDirectorMutation } from './mutation'

const withGraphqlDelete = graphql(deleteDirectorMutation, {
    props: ({ mutate }) => ({
        deleteDirector: id => mutate({
            variables: id,
            refetchQueries: [{
                query: directorsQuery,
                variables: { name: '' },
            }]
        })
    })
})

export default compose(
    withGraphqlDelete,
);
