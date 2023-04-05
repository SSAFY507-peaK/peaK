import React, { useRef } from "react";
import {useLoaderData, useSearchParams} from "react-router-dom"
import { useDispatch } from "react-redux";
import { CreateTOKEN } from "../../_store/slices/UserSlice";
import { IdolListsType } from "../../_utils/Types";
import { Container } from "../../components/SignUpPage/SignUpComponents";
import SignUp1 from "./SignUp1";
import SignUp2 from "./SignUp2";

function SignUpPage() {
  let dispatch = useDispatch();
  const idolLists = useLoaderData() as IdolListsType;
  const containerRef = useRef<HTMLDivElement>(null);

  let [query, setQuery] = useSearchParams()
  const TOKEN = query.get("token");
  console.log(TOKEN);
  // const TOKEN = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNzM0MTU1ODM2IiwiQXV0aGVudGljYXRpb24iOnsiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfR1VFU1QifV0sImRldGFpbHMiOnsicmVtb3RlQWRkcmVzcyI6IjMuMzguOTIuMTExIiwic2Vzc2lvbklkIjoiMDNDMDZDQTlCRUUwQ0I2NUM0OTA4ODAxMjZFMkQ0RjQifSwiYXV0aGVudGljYXRlZCI6dHJ1ZSwicHJpbmNpcGFsIjp7ImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJST0xFX0dVRVNUIn1dLCJhdHRyaWJ1dGVzIjp7ImlkIjoyNzM0MTU1ODM2LCJjb25uZWN0ZWRfYXQiOiIyMDIzLTA0LTAzVDEzOjU2OjE5WiIsImtha2FvX2FjY291bnQiOnsiaGFzX2VtYWlsIjp0cnVlLCJlbWFpbF9uZWVkc19hZ3JlZW1lbnQiOmZhbHNlLCJpc19lbWFpbF92YWxpZCI6dHJ1ZSwiaXNfZW1haWxfdmVyaWZpZWQiOnRydWUsImVtYWlsIjoicXJpOThAbmF2ZXIuY29tIn19LCJlbWFpbCI6InFyaTk4QG5hdmVyLmNvbSIsInJvbGUiOiJST0xFX0dVRVNUIiwibmFtZSI6IjI3MzQxNTU4MzYifSwiYXV0aG9yaXplZENsaWVudFJlZ2lzdHJhdGlvbklkIjoia2FrYW8iLCJjcmVkZW50aWFscyI6IiIsIm5hbWUiOiIyNzM0MTU1ODM2In0sImVtYWlsIjoicXJpOThAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfR1VFU1QiLCJpYXQiOjE2ODA2NzAxNjAsImV4cCI6MTY4MDY3MTk2MH0.xFauIeONpd41OK5FM2pq02rp5jiS56DMgH25Xs_aaniE6a5u-k5_LGW_f6nrUjbDo3y24jYv9tHqJdLimo2esg"
  dispatch(CreateTOKEN(TOKEN));

  /** 페이지 이동 함수 */
  const handleChangePage = (page:number) => {
    containerRef.current && (
      page === 1 ?
        containerRef.current.scrollBy({
          left: 0,
          top: window.innerHeight,
          behavior: "smooth",
        }) :
        containerRef.current.scrollBy({
          left: 0,
          top: -window.innerHeight,
          behavior: "smooth",
        })
    )
  }

  return (
    <Container ref={containerRef}>
      <SignUp1 TOKEN={TOKEN} handleChangePage={handleChangePage} />
      <SignUp2 TOKEN={TOKEN} handleChangePage={handleChangePage} idolLists={idolLists} />
    </Container>
  );
}

export default SignUpPage;