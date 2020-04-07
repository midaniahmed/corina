import axios from "axios";

export const DONATION_LOADED = "tunisia:donation:loaded";
export const TUNISIA_PROVINCES_LOADED = "tunisia:provinces:loaded";
export const TUNISIA_BY_AGE_LOADED = "tunisia:ages:loaded";

const PROVINCES_URL = "https://services6.arcgis.com/BiTAc9ApDDtL9okN/arcgis/rest/services/Statistiques_par_gouvernorat_(nouvelle_donn%C3%A9e)/FeatureServer/0/query?f=json&where=Nb_cas%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&maxAllowableOffset=2445&geometry=%7B%22xmin%22%3A-0.0000019073486328125%2C%22ymin%22%3A3757032.8142744694%2C%22xmax%22%3A1252344.2714222819%2C%22ymax%22%3A5009377.085698657%2C%22spatialReference%22%3A%7B%22wkid%22%3A102100%2C%22latestWkid%22%3A3857%7D%7D&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*&outSR=102100&resultType=tile";
const AGES_URL = "https://services6.arcgis.com/BiTAc9ApDDtL9okN/arcgis/rest/services/survey123_2397b0cb2a074abbab70b6ff17fd191d/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&groupByFieldsForStatistics=age&orderByFields=age%20desc&outStatistics=%5B%7B%22statisticType%22%3A%22count%22%2C%22onStatisticField%22%3A%22objectid%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true";

export function getDonation() {
  return dispatch => {
    axios.get(`https://apis.cni.tn/donate/getAmount`)
      .then(({data}) => {
        dispatch({ type: DONATION_LOADED, payload: data });
      })
      .catch(err => {})
  }
};

export function getProvinces() {
  return dispatch => {
    axios.get(PROVINCES_URL)
      .then(({data}) => {
        dispatch({ type: TUNISIA_PROVINCES_LOADED, payload: data });
      })
      .catch(err => {})
  }
}

export function getCaseByAge() {
  return dispatch => {
    axios.get(AGES_URL)
      .then(({data}) => {
        dispatch({ type: TUNISIA_BY_AGE_LOADED, payload: data.features ? data.features: [] });
      })
      .catch(err => {})
  }
}