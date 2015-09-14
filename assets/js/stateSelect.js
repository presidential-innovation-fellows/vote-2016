var vote2016 = vote2016 || {};

var stateWebsites = [
  { "state": "AZ", "website": "https://servicearizona.com/webapp/evoter/" },
  { "state": "CA", "website": "http://registertovote.ca.gov/" },
  { "state": "CO", "website": "https://www.sos.state.co.us/voter-classic/secuRegVoterIntro.do" },
  { "state": "CT", "website": "https://voterregistration.ct.gov/OLVR/" },
  { "state": "DE", "website": "https://ivote.de.gov/" },
  { "state": "GA", "website": "https://registertovote.sos.ga.gov/GAOLVR/#no-back-button" },
  { "state": "HI", "website": "https://olvr.hawaii.gov/" },
  { "state": "IL", "website": "https://ova.elections.il.gov/" },
  { "state": "IN", "website": "http://indianavoters.in.gov/PublicSite/OVR/Introduction.aspx" },
  { "state": "KS", "website": "https://www.kdor.org/voterregistration/Default.aspx" },
  { "state": "LA", "website": "http://www.sos.la.gov/ElectionsAndVoting/Pages/OnlineVoterRegistration.aspx" },
  { "state": "MA", "website": "https://www.sec.state.ma.us/ovr/" },
  { "state": "MD", "website": "https://voterservices.elections.state.md.us/OnlineVoterRegistration/VoterType" },
  { "state": "MN", "website": "https://mnvotes.sos.state.mn.us/VoterRegistration/VoterRegistrationStep1.aspx" },
  { "state": "MO", "website": "http://www.sos.mo.gov/elections/goVoteMissouri/register.aspx" },
  { "state": "NV", "website": "https://nvsos.gov/sosvoterservices/Registration/step1.aspx" },
  { "state": "NY", "website": "http://dmv.ny.gov/org/more-info/electronic-voter-registration-application" },
  { "state": "OR", "website": "https://secure.sos.state.or.us/orestar/vr/register.do?lang=eng&source=SOS" },
  { "state": "PA", "website": "https://www.pavoterservices.state.pa.us/Pages/VoterRegistrationApplication.aspx" },
  { "state": "SC", "website": "https://info.scvotes.sc.gov/eng/ovr/start.aspx" },
  { "state": "UT", "website": "https://secure.utah.gov/voterreg/index.html" },
  { "state": "VA", "website": "https://www.vote.virginia.gov/" },
  { "state": "WA", "website": "https://wei.sos.wa.gov/agency/osos/en/pages/myvote.aspx" }
]

vote2016.stateSelect = {

  bindModalClose: function() {
    $(".close").bind("click", function(e){
      e.preventDefault();
      $(".overlay").removeClass("active");
      $(".modal").removeClass("active");
    })
  },

  bindFunctions: function() {
    vote2016.stateSelect.bindModalClose();
    vote2016.stateSelect.bindStateSelect();
  },

  bindStateSelect: function() {
    $(".state-select select").bind("change", function(){
      vote2016.stateSelect.checkWebsite($(this));
    })
  },

  checkWebsite: function(self) {
    var selectedState = $(self).val(),
        state = $.grep(stateWebsites, function(e){ return e.state == selectedState; });

    if (state.length == 0) {
      vote2016.stateSelect.loadTurboVote();
    } else if (state.length == 1) {
      vote2016.stateSelect.loadStateModal(state);
    } else {
      alert("Error - Something Went Wrong");
    }
  },

  loadStateModal: function(state) {
    var stateName = $(".state-select option:selected").text(),
        stateLink = state[0].website;
    $(".state-modal .state-name").text(stateName);
    $(".state-modal .state-link").attr("href", stateLink);
    $(".overlay").addClass("active");
    $(".state-modal").addClass("active");
  },

  loadTurboVote: function() {
    $(".overlay").addClass("active");
    $(".turbovote-modal").addClass("active");
  }
}

$(document).ready(vote2016.stateSelect.bindFunctions());
