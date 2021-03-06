import { DONATION_LOADED, TUNISIA_PROVINCES_LOADED, TUNISIA_BY_AGE_LOADED } from "ReduxActions/tunisiaActions";

const initialState = {
  totalDonation: 0,
  provinces: [],
  ages: [],
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

    case TUNISIA_BY_AGE_LOADED:
      return {
        ...state,
        ages: action.payload.map(it => ({...it.attributes})),
      };

    default:
      return state;
  }
}
