import { api } from "./api";

const boardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => ({
        url: "boards",
      }),
      providesTags: ["Board"],
    }),
    getBoard: builder.query({
      query: (boardId) => ({
        url: `boards/${boardId}`,
      }),
      providesTags: (result, error, boardId) => [
        { type: "Board", id: boardId },
      ],
    }),
    addBoard: builder.mutation({
      query: (newBoard) => ({
        url: "boards",
        method: "POST",
        body: newBoard,
      }),
      invalidatesTags: ["Board"],
    }),
    updateBoard: builder.mutation({
      query: ({ boardId, updateBoard }) => ({
        url: `boards/${boardId}`,
        method: "PATCH",
        body: updateBoard,
      }),
      invalidatesTags: (result, error, { boardId }) => [
        { type: "Board", id: boardId },
      ],
    }),
    deleteBoard: builder.mutation({
      query: (boardId) => ({
        url: `boards/${boardId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { boardId }) => [
        { type: "Board", id: boardId },
      ],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
