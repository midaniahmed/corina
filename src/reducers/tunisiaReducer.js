import { DONATION_LOADED, TUNISIA_PROVINCES_LOADED } from "ReduxActions/tunisiaActions";

const initialState = {
  totalDonation: 0,
  provinces: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DONATION_LOADED:
      return {
        ...state,
        totalDonation: action.payload.totSolde,
      };

    case TUNISIA_PROVINCES_LOADED:
      return {
        ...state,
        provinces: action.payload.features,
      };

    default:
      return state;
  }
}
