import React, { useState, useContext, useCallback, useRef } from "react";
import { SubjectViewModalUI } from "./SubjectModalUI";

const ctx = React.createContext<
  (
    params: SubjectViewPromptInfo,
    cb: CallbackFn,
    onCancelCb: CallbackFn
  ) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
>(null as any);

type CallbackFn = () => void;

export function useSubjectPromptCb(defaultParams: SubjectViewPromptInfo) {
  const openPrompt = useContext(ctx);

  return (params: Partial<SubjectViewPromptInfo>, cb: CallbackFn) => {
    const info = { ...defaultParams, ...params };
    return () => {
      openPrompt(info, cb, () => {
        console.log("Cancelled View");
      });
    };
  };
}

export function useSubjectViewPrompt(defaultParams: SubjectViewPromptInfo) {
  const openPrompt = useContext(ctx);

  return (params?: Partial<SubjectViewPromptInfo>) => {
    const info = { ...defaultParams, ...params };
    return new Promise<void>((resolve, reject) => {
      openPrompt(info, resolve, reject);
    });
  };
}

export function SubjectPromptProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [info, setInfo] = useState<SubjectViewPromptInfo | null>(null);
  const cbRef = useRef<CallbackFn | null>(null);
  const cancelCbRef = useRef<CallbackFn | null>(null);
  const openPrompt = useCallback(
    (params: SubjectViewPromptInfo, cb: CallbackFn, onCancelCb: CallbackFn) => {
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
        <SubjectViewModalUI
          isOpen={true}
          onClose={onCancel}
          onConfirm={onConfirm}
          info={info as SubjectViewPromptInfo}
        />
      )}
      {children}
    </ctx.Provider>
  );
}

export interface SubjectViewPromptInfo {
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
