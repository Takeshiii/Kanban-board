import { api } from "./api";

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: (cardId) => ({
        url: `cards/${cardId}/tasks`,
      }),
      providesTags: ["Task"],
    }),
    addTask: builder.mutation({
      query: ({ cardId, newTask }) => ({
        url: `cards/${cardId}/tasks`,
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ taskId, updateTask }) => ({
        url: `tasks/${taskId}`,
        method: "PATCH",
        body: updateTask,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
