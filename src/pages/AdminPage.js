import React, { useEffect, useState } from "react";
import AnimationRevealPage from "../helpers/AnimationRevealPage";
import Header from "components/headers/light";
import Footer from "components/footers/MiniCenteredFooter";
import DonateModalInfoAdmin from "../components/cards/DonateModalInfoAdmin";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert";
import Modal from "react-modal";
const AdminPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaign, setCampaign] = useState({});
  const [campaignState, setCampaignState] = useState("all");
  const [actionState, setActionState] = useState(false);

  let campaignsToDisplay = campaigns;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/")
      .then((response) => setCampaigns(response.data));
  }, []);

  const filterCampaignsByState = (obj) => {
    if (campaignState === "all") return true;
    return obj.status === campaignState;
  };

  campaignsToDisplay = campaigns.filter(filterCampaignsByState);

  const campaignStateChangeHandler = (event) => {
    setCampaignState(event.target.value);
  };

  const viewMoreHandler = (campaign) => {
    setActionState(true);
    setCampaign(campaign);
  };

  const adminCampaignStateChangeHandler = (responseData) => {
    const newCampaigns = campaigns.map((obj) => {
      if (obj.campaignId === responseData.campaignId) {
        return { ...obj, status: responseData.status };
      }

      return obj;
    });

    setCampaigns(newCampaigns);
  };

  const statusContainerClass =
    "px-2 py-1 w-fit  m-auto  my-4 items-center text-xs rounded-md font-semibold uppercase";

  const approveHandler = (campaignId) => {
    swal({
      title: "Are you sure, want to Approve this campaign?",
      text: "Once approved can not be taken back",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willApprove) => {
      if (willApprove) {
        axios
          .put(`http://127.0.0.1:5000/updateStatus/${campaignId}`, {
            status: "active",
          })
          .then((response) => {
            if (response.status == 200) {
              // setCampaigns([...campaigns, response.data]);
              adminCampaignStateChangeHandler(response.data);
              swal("Yayy!, Campaign has been approved and now being active", {
                icon: "success",
              });
            } else {
              swal("Some error occurred, Please try again!", {
                icon: "error",
              });
            }
          });
      } else {
        swal("You choose not to approve");
      }
    });
  };

  const rejectHandler = (campaignId) => {
    swal({
      text: "Enter the Reject Reason",
      content: "input",
      button: {
        text: "Reject",
        closeModal: false,
      },
    })
      .then((rejectReason) => {
        if (!rejectReason) throw null;

        return axios.put(`http://127.0.0.1:5000/updateStatus/${campaignId}`, {
          status: "rejected",
          rejectReason: rejectReason,
        });
      })
      .then((results) => {
        return results.data;
      })
      .then((json) => {
        const newCampaigns = campaigns.map((obj) => {
          if (obj.campaignId === json.campaignId) {
            return { ...obj, status: json.status };
          }

          return obj;
        });

        setCampaigns(newCampaigns);
        swal("Campaign was rejected", {
          icon: "success",
        });
      })
      .catch((err) => {
        if (err) {
          swal("Oh no!", "Error occurred, please try again later", "error");
        } else {
          swal.stopLoading();
          swal.close();
        }
      });
  };

  const dropDownSelection = (
    <div className="flex flex-row-reverse mt-14">
      <div className="flex flex-col">
        <label
          htmlFor="states"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select an State
        </label>
        <select
          id="states"
          onChange={campaignStateChangeHandler}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="inreview">In Review</option>
          <option value="goalReached">Goal Reached</option>
          <option value="active">Active</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );

  const tableView = (
    <div className="container mx-auto px-4 sm:px-8 w-screen h-fit">
      {dropDownSelection}
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Campaign Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    End Date
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Goal Amount
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaignsToDisplay.length ? (
                  campaignsToDisplay.map((campaign) => (
                    <tr key={campaign.campaignId}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {campaign.createdBy}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {campaign.campaignName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(campaign.createdAt).format("LL")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {moment(campaign.campaignLastDate).format("LL")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap uppercase">
                          {campaign.status === "goalReached" ? (
                            <span
                              className={`${statusContainerClass} text-blue-500 border border-blue-500 bg-blue-100 uppercase`}
                            >
                              {`GOAL REACHED`}
                            </span>
                          ) : null}
                          {campaign.status === "inreview" ? (
                            <span
                              className={`${statusContainerClass} text-yellow-500 border border-yellow-500 bg-yellow-100 uppercase`}
                            >
                              {`IN REVIEW`}
                            </span>
                          ) : null}
                          {campaign.status === "rejected" ? (
                            <span
                              className={`${statusContainerClass} text-red-500 border border-red-500 bg-red-100 uppercase`}
                            >
                              {`REJECTED`}
                            </span>
                          ) : null}
                          {campaign.status === "active" ? (
                            <span
                              className={`${statusContainerClass} text-green-500 border border-green-500 bg-green-100 uppercase`}
                            >
                              {`ACTIVE`}
                            </span>
                          ) : null}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap uppercase">
                          <span>&#36; </span>
                          {campaign.campaignTotalAmount}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {campaign.status === "inreview" ? (
                          <div>
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span
                                className="relative"
                                onClick={() => {
                                  approveHandler(campaign.campaignId);
                                }}
                              >
                                Approve
                              </span>
                            </span>
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span
                                className="relative"
                                onClick={() => {
                                  rejectHandler(campaign.campaignId);
                                }}
                              >
                                Reject
                              </span>
                            </span>
                          </div>
                        ) : null}
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span
                            className="relative"
                            onClick={() => {
                              viewMoreHandler(campaign);
                            }}
                          >
                            View
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <div className="m-auto">
                      <p className="items-center whitespace-no-wrap text-blue-900 uppercase">
                        No campaigns here to display
                      </p>
                    </div>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimationRevealPage>
      <Header />
      {actionState ? (
        <Modal isOpen={actionState}>
          <DonateModalInfoAdmin
            campaign={campaign}
            showPaymentCard={false}
            closeModal={() => setActionState(false)}
            admin={true}
            showApprove={campaign.status === "inreview"}
            adminCampaignStateChangeHandler={adminCampaignStateChangeHandler}
          />
        </Modal>
      ) : null}

      <div className="flex min-h-screen flex-col justify-between">
        {tableView}
        <Footer />
      </div>
    </AnimationRevealPage>
  );
};

export default AdminPage;
