import { api } from "./api";

const columnsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getColumns: builder.query({
      query: (boardId) => ({
        url: `boards/${boardId}/columns`,
      }),
      providesTags: ["Column", "Card"],
    }),
    addColumn: builder.mutation({
      query: ({ boardId, newColumn }) => ({
        url: `boards/${boardId}/columns`,
        method: "POST",
        body: newColumn,
      }),
      invalidatesTags: ["Column"],
    }),
    updateColumn: builder.mutation({
      query: ({ columnId, updateColumn }) => ({
        url: `columns/${columnId}`,
        method: "PATCH",
        body: updateColumn,
      }),
      invalidatesTags: ["Column", "Card"],
    }),
    deleteColumn: builder.mutation({
      query: (columnId) => ({
        url: `columns/${columnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Column"],
    }),
  }),
});

export const {
  useGetColumnsQuery,
  useAddColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = columnsApi;
