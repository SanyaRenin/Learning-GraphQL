import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {graphql} from 'react-apollo/lib/index'

import { styles } from './styles';
import {moviesQuery} from '../MoviesTable/queries'
import { directorsQuery } from './queries'
import { addMovieMutation, updateMovieMutation } from './mutation'

const withGraphqlAdd = graphql(addMovieMutation, {
    props: ({ mutate }) => ({
        addMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{
                query: moviesQuery,
                variables: { name: '' }
            }]
        })
    })
})

const withGraphqlupdate = graphql(updateMovieMutation, {
    props: ({ mutate }) => ({
        updateMovie: movie => mutate({
            variables: movie,
            refetchQueries: [{
                query: moviesQuery,
                variables: { name: '' }
            }]
        })
    })
})

const withGraphQL = compose(
    withGraphqlAdd,
    withGraphqlupdate,
    graphql(directorsQuery, {
        options: ({ name = ''}) => ({
            variables: { name },
        })
    }),
)

export default compose(
    withStyles(styles),
    withGraphQL,
);
