import { api } from "./api";

const cardsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query({
      query: (columnId) => ({
        url: `columns/${columnId}/cards`,
      }),
      providesTags: ["Card"],
    }),
    getCard: builder.query({
      query: (cardId) => ({
        url: `cards/${cardId}`,
      }),
      providesTags: (result, error, cardId) => [{ type: "Card", id: cardId }],
    }),
    addCard: builder.mutation({
      query: ({ columnId, newCard }) => ({
        url: `columns/${columnId}/cards`,
        method: "POST",
        body: newCard,
      }),
      invalidatesTags: ["Card"],
    }),
    updateCard: builder.mutation({
      query: ({ cardId, updateCard }) => ({
        url: `cards/${cardId}`,
        method: "PATCH",
        body: updateCard,
      }),
      invalidatesTags: (result, error, { cardId }) => [
        { type: "Card", id: cardId },
      ],
    }),
    deleteCard: builder.mutation({
      query: (cardId) => ({
        url: `cards/${cardId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { cardId }) => [
        { type: "Card", id: cardId },
      ],
    }),
  }),
});

export const {
  useGetCardsQuery,
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useGetCardQuery,
} = cardsApi;
