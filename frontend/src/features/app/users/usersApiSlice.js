import { apiSlice } from '../../../app/api/apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
  tagTypes: 'User',
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: (_id) => `/users/profile`,
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/users/profile/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['User'],
    }),
    userLookup: builder.query({
      query: () => `/users/lookup`,
      providesTags: ['User'],
    }),
    users: builder.query({
      query: (arg) => `/users?${arg}`,
      providesTags: ['User'],
    }),
    user: builder.query({
      query: (_id) => `/users/${_id}`,
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ _id, ...rest }) => ({
        url: `/users/${_id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useUserLookupQuery,
  useUserProfileQuery,
  useUpdateUserProfileMutation,
  useUsersQuery,
  useUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersApiSlice
