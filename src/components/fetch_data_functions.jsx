import axios from "axios";

export const getButtons = congress => {
  return axios
    .get("http://127.0.0.1:5000/api/" + congress.toString())
    .then(response => {
      var retData = [];
      Object.keys(response.data.reps).forEach(rep => {
        var data = [];
        var val = response.data.reps[rep];
        data.push(val.name, val.id.bioguide);
        Object.keys(val.terms).forEach(idx => {
          var congressTerm = val.terms[idx].congress;
          Object.keys(congressTerm).forEach(term => {
            if (congressTerm[term] === congress) {
              data.push(val.terms[idx].state, val.terms[idx].party);
            }
          });
        });
        retData.push(data);
      });
      return retData;
    });
};

export const getBills = (sponsor, congress) => {
  return axios
    .get("http://127.0.0.1:5000/api/" + sponsor + "/" + congress.toString())
    .then(res => {
      var retData = [];
      Object.keys(res.data.bills).forEach(bill => {
        var data = [];
        var val = res.data.bills[bill];
        data.push(val.enacted_as);
        if (val.cosponsors !== undefined) {
          var cosponsorData = [];
          Object.keys(val.cosponsors).forEach(cosponsor => {
            cosponsorData.push(val.cosponsors[cosponsor].bioguide_id);
          });
          data.push(cosponsorData);
        }
        retData.push(data);
      });
      return retData;
    });
};
