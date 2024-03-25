import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { WorkflowType } from "@/types";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeRemoveChange,
} from "reactflow";

export type WorkFlowBuilderState = {
  items: WorkflowType[];
  currentItem: WorkflowType | null;
};

const initialState: WorkFlowBuilderState = {
  items: [],
  currentItem: null,
};

export const workFlowBuilderSlice = createSlice({
  name: "workFlowBuilder",
  initialState,
  reducers: {
    setCurrentWorkflow: (state, action: PayloadAction<WorkflowType>) => {
      state.currentItem = action.payload;
    },
    createWorkflow: (state, action: PayloadAction<WorkflowType>) => {
      state.items.push({ ...action.payload, id: state.items.length + 1 });
      state.currentItem = initialState.currentItem;
    },
    updateWorkflow: (
      state,
      action: PayloadAction<{ id: number; data: WorkflowType }>
    ) => {
      const { id, data } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index] = data;
      state.currentItem = initialState.currentItem;
    },
    addNewNode: (state, action: PayloadAction<Node>) => {
      state.currentItem?.nodes.push({
        ...action.payload,
        id: (state.currentItem?.nodes.length + 1).toString(),
      });
    },
    updateNodes: (state, action: PayloadAction<Node[]>) => {
      if (state.currentItem) {
        state.currentItem.nodes = action.payload;
      }
    },
    updateNodeData: (
      state,
      action: PayloadAction<{ id: string; data: any }>
    ) => {
      const { id, data } = action.payload;
      if (state.currentItem) {
        const index = state.currentItem.nodes.findIndex(
          (node) => node.id === id
        );
        state.currentItem.nodes[index].data = data;

        if (
          state.currentItem.nodes[index].type === "fileUploadNode" &&
          state.currentItem.edges.some((edge) => edge.source === id)
        ) {
          const filteredEdges = state.currentItem.edges.filter(
            (edge) => edge.source === id
          );
          filteredEdges.forEach((edge) => {
            if (state.currentItem) {
              const index = state.currentItem.nodes.findIndex(
                (node) => node.id === edge.target
              );
              state.currentItem.nodes[index].data = data;
            }
          });
        }
      }
    },
    updateEdges: (
      state,
      action: PayloadAction<{
        edges: Edge[];
        currentEdge: Connection | EdgeChange[];
      }>
    ) => {
      const { edges, currentEdge } = action.payload;
      if (state.currentItem) {
        if (currentEdge instanceof Array) {
          if (currentEdge[0].type === "remove") {
            const edgeIndex = state.currentItem.edges.findIndex(
              (edge) => edge.id === (currentEdge[0] as NodeRemoveChange).id
            );
            const foundEdge = state.currentItem.edges[edgeIndex];
            const targetNodeIndex = state.currentItem.nodes.findIndex(
              (node) => node.id === foundEdge.target
            );
            state.currentItem.nodes[targetNodeIndex].data = null;
          }
        } else {
          const sourceNodeIndex = state.currentItem.nodes.findIndex(
            (node) => node.id === currentEdge.source
          );
          const targetNodeIndex = state.currentItem.nodes.findIndex(
            (node) => node.id === currentEdge.target
          );
          if (
            state.currentItem.nodes[sourceNodeIndex].type === "fileUploadNode"
          ) {
            state.currentItem.nodes[targetNodeIndex].data =
              state.currentItem.nodes[sourceNodeIndex].data;
          } else {
            state.currentItem.nodes[targetNodeIndex].data = null;
          }
        }
        state.currentItem.edges = edges;
      }
    },
    setPreview: (state, action: PayloadAction<any>) => {
      if (state.currentItem) {
        state.currentItem.preview = action.payload;
      }
    },
    resetPreview: (state) => {
      if (state.currentItem) {
        state.currentItem.preview =
          initialState.currentItem?.preview || "No Preview";
      }
    },
  },
});

export const {
  createWorkflow,
  updateWorkflow,
  addNewNode,
  setPreview,
  resetPreview,
  setCurrentWorkflow,
  updateNodes,
  updateEdges,
  updateNodeData,
} = workFlowBuilderSlice.actions;

export const getWorkflowByIdSelectors = (
  state: RootState,
  workflowId?: number
) => {
  return (
    state.workFlowBuilder.items.find((item) => item.id === workflowId) || null
  );
};

export const getWorkFlowDataSelector = (state: RootState) => {
  return state.workFlowBuilder;
};

export const getWorkflowListSelectors = createSelector(
  getWorkFlowDataSelector,
  ({ items }) => {
    return items.map((workflow) => ({
      id: workflow.id,
      name: workflow.name,
    }));
  }
);

export const getPreviewSelectors = createSelector(
  getWorkFlowDataSelector,
  ({ currentItem }) => {
    return currentItem?.preview || "No Preview";
  }
);

export const getNodesSelectors = createSelector(
  getWorkFlowDataSelector,
  ({ currentItem }) => {
    return currentItem?.nodes || [];
  }
);

export const getEdgesSelectors = createSelector(
  getWorkFlowDataSelector,
  ({ currentItem }) => {
    return currentItem?.edges || [];
  }
);

export const getCurrentWorkflowSelectors = createSelector(
  getWorkFlowDataSelector,
  ({ currentItem }) => {
    return currentItem || null;
  }
);

export default workFlowBuilderSlice.reducer;
