/* global $:false */

var vote2016 = vote2016 || {};

var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

 if (isSafari) {
  $("html").addClass("safari");
}

var isIos = !!/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIos) {
  $("html").addClass("ios");
}

var autoRegistered = [
  { "state": "ND", "website": "https://vip.sos.nd.gov/PortalList.aspx" }
];

var stateWebsites = [
  { "state": "AK", "website": "https://voterregistration.alaska.gov/?ref=voteusa" },
  { "state": "AL", "website": "https://www.alabamavotes.gov/olvr/default.aspx?ref=voteusa" },
  { "state": "AZ", "website": "https://servicearizona.com/webapp/evoter/?ref=voteusa" },
  { "state": "CA", "website": "http://registertovote.ca.gov/?ref=voteusa" },
  { "state": "CO", "website": "https://www.sos.state.co.us/voter-classic/pages/pub/home.xhtml?ref=voteusa" },
  { "state": "CT", "website": "https://voterregistration.ct.gov/OLVR/?ref=voteusa" },
  { "state": "DC", "website": "https://www.vote4dc.com/Voter/Voter/CommonVoter?ref=voteusa" },
  { "state": "DE", "website": "https://ivote.de.gov/?ref=voteusa" },
  { "state": "GA", "website": "https://registertovote.sos.ga.gov/GAOLVR/welcome.do?ref=voteusa#no-back-button" },
  { "state": "HI", "website": "https://olvr.hawaii.gov/?ref=voteusa" },
  { "state": "IA", "website": "https://sos.iowa.gov/elections/voterinformation/voterregistration.html?ref=voteusa" },
  { "state": "IL", "website": "https://ova.elections.il.gov/?ref=voteusa" },
  { "state": "IN", "website": "http://indianavoters.in.gov/PublicSite/OVR/Introduction.aspx?ref=voteusa" },
  { "state": "KS", "website": "https://www.kdor.org/voterregistration/Default.aspx?ref=voteusa" },
  { "state": "KY", "website": "https://vrsws.sos.ky.gov/ovrweb/?ref=voteusa"},
  { "state": "LA", "website": "http://www.sos.la.gov/ElectionsAndVoting/Pages/OnlineVoterRegistration.aspx?ref=voteusa" },
  { "state": "MA", "website": "https://www.sec.state.ma.us/ovr/?ref=voteusa" },
  { "state": "MD", "website": "https://voterservices.elections.state.md.us/OnlineVoterRegistration/VoterType?ref=voteusa" },
  { "state": "MN", "website": "https://mnvotes.sos.state.mn.us/VoterRegistration/VoterRegistrationStep1.aspx?ref=voteusa" },
  { "state": "MO", "website": "http://www.sos.mo.gov/elections/goVoteMissouri/register?ref=voteusa" },
  { "state": "NE", "website": "https://www.nebraska.gov/apps-sos-voter-registration/?ref=voteusa" },
  { "state": "NM", "website": "https://portal.sos.state.nm.us/OVR/(S(4hlbisjwvitf2uufzogfckge))/WebPages/InstructionsStep1.aspx?ref=voteusa" },
  { "state": "NV", "website": "https://nvsos.gov/sosvoterservices/Registration/step1.aspx?ref=voteusa" },
  { "state": "NY", "website": "https://dmv.ny.gov/org/more-info/electronic-voter-registration-application?ref=voteusa" },
  { "state": "OR", "website": "https://secure.sos.state.or.us/orestar/vr/register.do?ref=voteusa" },
  { "state": "PA", "website": "https://www.pavoterservices.state.pa.us/Pages/VoterRegistrationApplication.aspx?ref=voteusa" },
  { "state": "SC", "website": "https://info.scvotes.sc.gov/eng/ovr/start.aspx?ref=voteusa" },
  { "state": "UT", "website": "https://secure.utah.gov/voterreg/index.html?ref=voteusa" },
  { "state": "VA", "website": "https://www.vote.virginia.gov/?ref=voteusa" },
  { "state": "VT", "website": "https://olvr.sec.state.vt.us/?ref=voteusa" },
  { "state": "WA", "website": "https://wei.sos.wa.gov/agency/osos/en/pages/myvote.aspx?ref=voteusa" },
  { "state": "WV", "website": "https://ovr.sos.wv.gov/Register?ref=voteusa" }
];

var noVoting = [
  { "state": "AS", "website": "http://www.americansamoaelectionoffice.org" },
  { "state": "GU", "website": "http://gec.guam.gov" },
  { "state": "MP", "website": "http://votecnmi.gov.mp" },
  { "state": "NH", "website": "http://sos.nh.gov/Elections.aspx" },
  { "state": "PR", "website": "http://ceepur.org/"},
  { "state": "VI", "website": "http://www.vivote.gov" },
  { "state": "WY", "website": "http://soswy.state.wy.us/elections/" },
];

vote2016.website = {

  bindModalClose: function() {
    $(".close").bind("click", function(e){
      e.preventDefault();
      vote2016.website.closeModal();
    });
  },

  bindFunctions: function() {
    vote2016.website.bindModalClose();
    vote2016.website.bindSocialButtons();
    vote2016.website.bindStateSelect();
  },

  bindSocialButtons: function() {
    $(".social-buttons a").on("click", function(e){
      e.preventDefault();
      var url = $(this).attr("href");

      window.open(url, "targetWindow", "height=375,width=500");
    });

  },

  bindStateSelect: function() {
    $(".state-select select").bind("change", function(){
      vote2016.website.checkWebsite($(this));
      $("body").addClass("no-scroll");

    });
  },

  checkWebsite: function(self) {
    var selectedState = $(self).val(),
        gtgState = $.grep(autoRegistered, function(e){
          return e.state == selectedState;
        }),
        state = $.grep(stateWebsites, function(e){ return e.state == selectedState; }),
        noVote = $.grep(noVoting, function(e){ return e.state == selectedState; });


    if (noVote.length === 1) {
      vote2016.website.loadNoVoteModal(noVote);
    } else if (gtgState.length === 1) {
      vote2016.website.loadAlreadyRegisteredModal(gtgState);
    } else if (state.length === 0) {
      vote2016.website.loadPdfModal();
    } else if (state.length === 1) {
      vote2016.website.loadStateModal(state);
    } else {
      alert("Error - Something Went Wrong");
    }
  },

  closeModal: function() {
    $(".overlay").removeClass("active");
    $(".modal").removeClass("active");
    $("body").removeClass("no-scroll");
    $(".state-select select").val("");
  },

  loadAlreadyRegisteredModal: function(state) {
    var stateName = $(".state-select option:selected").text(),
        stateLink = state[0].website;

    $(".already-registered-modal .state-name").text(stateName);
    $(".already-registered-modal .state-link").attr("href", stateLink);
    $(".overlay").addClass("active");
    $(".already-registered-modal").addClass("active");
  },

  loadNoVoteModal: function(state) {
    var stateName = $(".state-select option:selected").text(),
        stateLink = state[0].website;
    $(".no-vote-modal .territory-name").text(stateName);
    $(".no-vote-modal .state-link").attr("href", stateLink);
    $(".overlay").addClass("active");
    $(".no-vote-modal").addClass("active");
  },

  loadStateModal: function(state) {
    var stateName = $(".state-select option:selected").text(),
        stateLink = state[0].website;
    $(".state-modal .state-name").text(stateName);
    $(".state-modal .state-link").attr("href", stateLink);
    $(".overlay").addClass("active");
    $(".state-modal").addClass("active");
  },

  loadPdfModal: function() {
    $(".overlay").addClass("active");
    $(".pdf-modal").addClass("active");
  }
};

$(document).ready(vote2016.website.bindFunctions());

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    vote2016.website.closeModal();
  }
});
