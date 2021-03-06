import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo'

import { styles } from './styles';
import { addDirectorMutation, updateDirectorMutation } from './mutation'
import { directorsQuery } from '../DirectorsTable/queries'

const withGraphqlAdd = graphql(addDirectorMutation, {
    props: ({ mutate }) => ({
        addDirector: director => mutate({
            variables: director,
            refetchQueries: [{
                query: directorsQuery,
                variables: { name: '' },
            }]
        })
    })
})

const withGraphqlUpdate = graphql(updateDirectorMutation, {
    props: ({ mutate }) => ({
        updateDirector: director => mutate({
            variables: director,
            refetchQueries: [{
                query: directorsQuery,
                variables: { name: '' },
            }]
        })
    })
})

const withGraphQL = compose(
    withGraphqlAdd,
    withGraphqlUpdate,
)

export default compose(
    withStyles(styles),
    withGraphQL,
);
