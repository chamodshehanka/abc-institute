import React, { useState, useContext, useCallback, useRef } from "react";
import { DeleteModalUI } from "./DeleteModalUI";
// import "./DeletePrompt.scss";

const ctx = React.createContext<
  (params: DeletePromptInfo, cb: CallbackFn, onCancelCb: CallbackFn) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(null as any);

type CallbackFn = () => void;

export function useDeletePromptCb(defaultParams: DeletePromptInfo) {
  const openPrompt = useContext(ctx);

  return (params: Partial<DeletePromptInfo>, cb: CallbackFn) => {
    const info = { ...defaultParams, ...params };
    return () => {
      openPrompt(info, cb, () => {
        console.log("Cancelled delete");
      });
    };
  };
}

export function useDeletePrompt(defaultParams: DeletePromptInfo) {
  const openPrompt = useContext(ctx);

  return (params?: Partial<DeletePromptInfo>) => {
    const info = { ...defaultParams, ...params };
    return new Promise<void>((resolve, reject) => {
      openPrompt(info, resolve, reject);
    });
  };
}

export function DeletPromptProvider({ children }: React.PropsWithChildren<{}>) {
  const [info, setInfo] = useState<DeletePromptInfo | null>(null);
  const cbRef = useRef<CallbackFn | null>(null);
  const cancelCbRef = useRef<CallbackFn | null>(null);
  const openPrompt = useCallback(
    (params: DeletePromptInfo, cb: CallbackFn, onCancelCb: CallbackFn) => {
      cbRef.current = cb;
      cancelCbRef.current = onCancelCb;
      setInfo(params);
    },
    []
  );
  const onConfirm = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    cbRef.current && cbRef.current();
    setInfo(null);
    cbRef.current = null;
    cancelCbRef.current = null;
  }, []);
  const onCancel = useCallback(() => {
    // eslint-disable-next-line no-unused-expressions
    cancelCbRef.current && cancelCbRef.current();
    setInfo(null);
    cbRef.current = null;
    cancelCbRef.current = null;
  }, []);
  return (
    <ctx.Provider value={openPrompt}>
      {info && (
        <DeleteModalUI
          isOpen={true}
          onClose={onCancel}
          onConfirm={onConfirm}
          info={info as DeletePromptInfo}
        />
      )}
      {children}
    </ctx.Provider>
  );
}

export interface DeletePromptInfo {
  /**
   * Expected input
   */
  textToMatch: string;
  /**
   * eg: "User"
   */
  resourceType: string;
  /**
   * eg: "username"
   */
  textType: string;
}
