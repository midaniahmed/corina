import { DONATION_LOADED } from "ReduxActions/tunisiaActions";

const initialState = {
  totalDonation: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DONATION_LOADED:
      return {
        ...state,
        totalDonation: action.payload.totSolde,
      };

    default:
      return state;
  }
}
