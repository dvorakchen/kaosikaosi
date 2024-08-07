import {
  ChangeEvent,
  createContext,
  FormEvent,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import { validateEmail } from "../utils/validation";
import { ArrowLeft } from "../components/icons";
import { sendCAPTCHA, validCAPTCHA } from "../http/authentication";
import { useNavigate } from "react-router-dom";

enum Process {
  Email,
  CAPTCHA,
}

const DispatchContext = createContext((_: Action) => {});

export default function Authenticate() {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    process: Process.Email,
  });

  let processView;

  switch (state.process) {
    case Process.CAPTCHA:
      processView = <InputCAPTCHA email={state.email} />;
      break;
    default:
      processView = <InputEmail email={state.email} />;
  }

  return (
    <main className="w-screen h-screen bg-volleyballBoys">
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-96 min-h-40 p-4 rounded-lg flex items-center justify-center bg-base-100 bg-base-100/70
        transition-all"
        >
          <DispatchContext.Provider value={dispatch}>
            {processView}
          </DispatchContext.Provider>
        </div>
      </div>
    </main>
  );
}

function InputEmail({ email }: { email: string }) {
  const [sendDisabled, setSendDisabled] = useState(!validateEmail(email));
  const [errorMsg, setErrorMsg] = useState(" ");
  const dispatch = useContext(DispatchContext);

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setSendDisabled(true);

    if (!validateEmail(email)) {
      setErrorMsg("邮箱格式不正确");
      setSendDisabled(false);
      return;
    }

    const err = await sendCAPTCHA(email);
    if (err === null) {
      dispatch({ type: "setProcess", process: Process.CAPTCHA } as Action);
    } else {
      setErrorMsg(err);
    }
  }

  function handleEmailInput(ev: ChangeEvent<HTMLInputElement>) {
    email = ev.target.value;

    if (validateEmail(email)) {
      setSendDisabled(false);
      setErrorMsg("");
      dispatch({ type: "setEmail", value: email } as Action);
    } else {
      setSendDisabled(true);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label className="input input-primary input-bordered flex items-center gap-2 bg-transparent">
        邮箱
        <input
          type="email"
          className="grow"
          placeholder="请输入邮箱地址"
          autoFocus={true}
          onChange={handleEmailInput}
          required
          defaultValue={email}
        />
      </label>
      <p className="text-error">{errorMsg}</p>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={sendDisabled}
      >
        发送验证码
      </button>
    </form>
  );
}

function InputCAPTCHA({ email }: { email: string }) {
  const CAPTCHA_LENGTH = 4;

  let captcha = useRef("");

  const [errorMsg, setErrorMsg] = useState(" ");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const dispatch = useContext(DispatchContext);

  const navigate = useNavigate();

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setBtnDisabled(true);

    let err = await validCAPTCHA(email, captcha.current);
    if (err === null) {
      navigate("/");
    } else {
      setBtnDisabled(false);
      setErrorMsg(err);
    }
  }

  function handleBack() {
    dispatch({ type: "setProcess", process: Process.Email } as Action);
  }

  function handleCAPTCHAInput(ev: ChangeEvent<HTMLInputElement>) {
    if (ev.target.value.length > CAPTCHA_LENGTH) {
      ev.target.value = ev.target.value.substring(0, CAPTCHA_LENGTH);
      return;
    }

    captcha.current = ev.target.value;
    setBtnDisabled(captcha.current.length !== CAPTCHA_LENGTH);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <div>
        <button
          type="button"
          className="btn btn-ghost btn-circle"
          onClick={handleBack}
        >
          <ArrowLeft />
        </button>
      </div>
      <label className="input input-primary input-bordered flex items-center gap-2 bg-transparent">
        验证码
        <input
          type="tel"
          className="grow"
          placeholder="请输入验证码"
          autoFocus={true}
          onChange={handleCAPTCHAInput}
          required
        />
      </label>
      <p className="text-error">{errorMsg}</p>
      <button type="submit" className="btn btn-primary" disabled={btnDisabled}>
        确定
      </button>
    </form>
  );
}

type Action = {
  type: "setEmail" | "setCAPTCHA" | "setProcess";
  value: string;
  process: Process;
};

type State = {
  email: string;
  process: Process;
};

function reducer(state: State, action: Action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case "setEmail":
      newState.email = action.value;
      break;
    case "setProcess":
      newState.process = action.process;
      break;
    default:
      throw "wrong action";
  }

  return newState;
}
