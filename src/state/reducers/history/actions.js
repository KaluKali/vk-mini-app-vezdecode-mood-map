import bridge from "@vkontakte/vk-bridge";

import * as types from "./actionTypes";
import {VK_APP_CLOSE} from "../../../constants/BridgeConstants";

export const setActivePanel = (panelId) => {
  return (dispatch, getState) => {
    const state = getState();
    const { activePanel, activeView } = state.history;

    if (activePanel === panelId) {
      return;
    }
    console.log(window.history)
    console.log(state.history)
    console.log(activePanel, activeView)
    window.history.pushState({ panel: panelId, view:activeView }, panelId);
    dispatch({
      type: types.SET_ACTIVE_PANEL,
      payload: { panelId: panelId, viewId: activeView },
    });
  };
};

export const setActiveView = ({ panelId, viewId }) => {
  return (dispatch, getState) => {
    const state = getState();
    const { activePanel } = state.history;

    if (activePanel === panelId) {
      return;
    }
    window.history.pushState({ panel: panelId, view:viewId }, panelId);
    dispatch({
      type: types.SET_ACTIVE_VIEW,
      payload: { panelId:panelId, viewId:viewId, history:{panelId: panelId, viewId: viewId }},
    })
  }
};

export const setPreviousPanel = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { history } = state.history;

    if (history.length === 1) {
      return bridge.send(VK_APP_CLOSE, { status: "success" });
    }

    const newHistory = history.slice(0, history.length - 1);



    return dispatch({ type: types.SET_PREVIOUS_PANEL, payload: newHistory });
  };
};
