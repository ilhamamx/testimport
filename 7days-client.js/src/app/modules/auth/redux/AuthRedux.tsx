interface InitialState {
  isAuth: boolean;
  user: any;
  isOnline: boolean;
  sessionCreated: number;
}
const UpdateAuthAction: string = "Auth";

export default InitialState;
export { UpdateAuthAction };
