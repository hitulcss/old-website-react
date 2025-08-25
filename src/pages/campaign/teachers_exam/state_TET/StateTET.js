import React from "react";
import "./StateTET.css";

const StateTET = () => {
  const maha_tet = [
    {
      id: "Educational Qualification",
      name: "Candidates must have completed Class 12 and Graduation.",
    },
    {
      id: "Teaching Qualification",
      name: "Candidates must possess a Diploma in Education or a Bachelor of Education degree.",
    },
  ];

  const mp_tet = [
    {
      id: "Educational Qualification",
      name: "Candidates must have completed Class 12 with at least 50% aggregate marks.",
    },
    {
      id: "Teaching Qualification",
      name: "A two-year Diploma in Elementary Education with at least 50% aggregate marks, A Bachelor of Education (B.Ed) degree with at least 50% aggregate marks, A Diploma in Special Education,A Bachelor of Elementary Education degree ",
    },
  ];

  const htet = [
    {
      id: "Educational Qualification",
      name: "Candidates must have scored 50% or above in their 12th standard examination",
    },
    {
      id: "Teaching Qualification",
      name: "Candidates must possess either a Bachelor of Education (B.Ed) degree or a diploma in education",
    },
  ];

  const uptet = [
    {
      id: "Educational Qualification",
      name: "Candidates must have scored a minimum of 50% marks in their Bachelor of Education (B.Ed) degree or a minimum of 45% marks in their  Diploma in Education (D.Ed)",
    },
    { id: "", name: "" },
  ];

  const tstet = [
    {
      id: "General",
      name: "Candidates must have scored 50% or above in  their 12th standard examination",
    },
    {
      id: "Reserved Categories",
      name: "Candidates from reserved categories must have secured a minimum of 45% aggregate marks in their bachelor's degree",
    },
  ];

  const otet = [
    {
      id: "Educational Qualification",
      name: "Candidates must have scored a minimum of 50% marks in their Bachelor of Education (B.Ed) degree or a minimum of 45% marks in their  Diploma in Education (D.Ed)",
    },
    { id: "", name: "" },
  ];

  const rtet = [
    {
      id: "Educational Qualification",
      name: "Candidates must have secured a minimum of  50% marks in their graduation degree.",
    },
    {
      id: "Teaching Qualification",
      name: "Candidates must have either completed or be appearing in the final year of their diploma program.",
    },
  ];

  const tntet = [
    {
      id: "Educational Qualification",
      name: "JCandidates must have scored 50% or above in their 12th standard examinationohn",
    },
    {
      id: "Teaching Qualification",
      name: "Candidates must possess either a Bachelor of Education (B.Ed) degree or a diploma in education",
    },
  ];

  const ktet = [
    {
      id: "Educational Qualification",
      name: "Candidates must have scored a minimum of  45% marks in their Senior Secondary examination.",
    },
    {
      id: "Teaching Qualification",
      name: "Candidates must possess either a 2-year Diploma in Elementary Education or a Trained Teachers' Certificate.",
    },
  ];

  const state_level = [
    {
      test: "Maharashtra State Eligibility Test (MH SET)",
      name: "Assistant Professor",
      name: "No Age Limit",
      name: "Post Graduation",
    },
    {
      test: "Andhra Pradesh State Eligibility Test (APSET)",
      name: "Assistant Professor  or Lecturer",
      name: "No Age Limit",
      name: "Post Graduation",
    },
    {
      test: "Kerala State Eligibility  Test (Kerala SET)",
      name: "Assistant Professor or Lecturer",
      name: "No Age Limit",
      name: "Post Graduation",
    },
    {
      test: "Telangana State Eligibility Test",
      name: "Assistant Professor  or Lecturer",
      name: "No Age Limit",
      name: "Post Graduation",
    },
    {
      test: "Jammu & Kashmir State  Eligibility Test (JK SET)",
      name: "Assistant Professor  or Lecturer",
      name: "No Age Limit",
      name: "Post Graduation",
    },
    {
      test: "West Bengal State  Eligibility Test (WB SET",
      name: "Assistant Professor or Lecturer",
      name: "No Age Limit",
      name: "Post Graduatione",
    },
    {
      test: "Kendriya Vidyalaya Sangathan (KVS Exam)",
      name: "Assistant Professor or Lecturer",
      name: "No Age Limit",
      name: "Post Graduatione",
    },
  ];

  return (
    <>
      <div className="state_tet_wrapper">
        <div className="state_tet_container">
          <h1>
            State <span style={{ color: "rgba(228, 110, 48, 1)" }}>TETs</span>
          </h1>

          <div className="maha_tet">
            <div className="maha_tet_descrip">
              {" "}
              <h2>1. Maharashtra Teacher Eligibility Test (MAHA TET)</h2>
              <p>
                The Maharashtra Teacher Eligibility Test (MAHA TET) is a
                state-level entrance exam conducted to determine the eligibility
                of candidates who wish to apply for teaching positions in
                schools in Maharashtra.
              </p>
              <p>
                It is conducted by the Maharashtra State Council of Examination
                (MSCE) in an offline mode. There are two levels of the MAHA TET
                exam:
              </p>
              <li>Primary (Paper 1)</li>
              <li>Upper Primary (Paper 2)</li>
              <p>
                Aspirants who wish to teach classes 1 to 5 must appear for Paper
                1, while those who wish to teach classes 6 to 8 must appear for
                Paper 2. Candidates who want to be eligible for teaching classes
                1 to 8 must appear for both papers
              </p>
            </div>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {maha_tet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mp_tet">
            <div className="mp_tet_descrip">
              {" "}
              <h2>2. Madhya Pradesh Teacher Eligibility Test (MP TET)</h2>
              <p>
                The Madhya Pradesh Professional Examination Board (MPPEB)
                conducts the Madhya Pradesh Teacher Eligibility Test (MP TET)
                for candidates seeking teaching positions in primary, middle,
                and high schools in the state of Madhya Pradesh.
              </p>
              <p>The MP TET exam is divided into three levels:</p>
              <li>Primary School</li>
              <li>Middle School</li>
              <li>UHigh School</li>
              <p>
                Candidates applying for teaching positions for Classes 1 to 5
                must take the MP Primary School TET exam. Aspirants planning to
                apply for teaching positions in Classes 6 to 8 must take the MP
                Middle School TET exam. Candidates who wish to teach Classes 9
                to 12 must take the MP High School TET exam. The MP TET exam is
                conducted in an online mode, and the questions asked are in the
                multiple-choice format.
              </p>
            </div>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {mp_tet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td style={{ width: "70%" }}>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="kartet">
            <h2>3. Karnataka Teacher Eligibility Test (KARTET)</h2>
            <p>
              The Karnataka Teacher Eligibility Test (KARTET) is administered by
              the Centralised Admission Cell (CAC), Office of the Commissioner
              of Public Instruction, Bangalore, Karnataka. The purpose of this
              exam is to assess a candidate's eligibility to teach classes 1
              through 8 in public schools within the state of Karnataka.
            </p>

            <h2>The KARTET consists of two papers: Paper 1 and Paper 2.</h2>
            <p>
              Paper 1 is for candidates seeking to teach lower primary classes
              (1 to 5), while Paper 2 is for those aiming to teach upper primary
              classes (6 to 8). Successful candidates are awarded a certificate
              of eligibility, which remains valid for life.
            </p>
          </div>

          <div className="htet">
            <h2>4. Haryana Teaching Entrance Test (HTET)</h2>
            <p>
              The Haryana Teacher Eligibility Test (HTET) is a state-level exam
              organized by the Board of Secondary Education Haryana (BSEH). The
              purpose of this exam is to shortlist candidates for teaching
              positions in private and government schools within the state. The
              HTET consists of three different offline papers, each carrying 150
              marks, and candidates are given 2.5 hours to complete the paper.
            </p>

            <li>
              Paper 1: Candidates who qualify this paper will be eligible to
              teach students of Classes I to V.
            </li>
            <li>
              Paper 2: Candidates selected through this paper will be appointed
              as teachers for Classes VI to VIII.
            </li>
            <li>
              Paper 3: After qualifying this paper, candidates will be selected
              as Post Graduate Teachers (PGTs) for classes IX-X.
            </li>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {htet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="uptet">
            <h2>5. Uttar Pradesh Teacher Eligibility Test (UPTET)</h2>
            <p>
              The Haryana Teacher Eligibility Test (HTET) is a state-level exam
              organized by the Board of Secondary Education Haryana (BSEH). The
              purpose of this exam is to shortlist candidates for teaching
              positions in private and government schools within the state. The
              HTET consists of three different offline papers, each carrying 150
              marks, and candidates are given 2.5 hours to complete the paper.
            </p>

            <p>
              The UPTET examination is conducted annually to recruit candidates
              for teaching primary (classes I to V) and upper primary (classes
              VI to VIII) levels. Applicants can appear for both UPTET Paper 1
              and Paper 2. Candidates who qualify Paper 1 will become teachers
              for Class I to Class V, while those who clear Paper 2 will be
              selected as teachers for Class VI to Class VIII. Each paper
              consists of 150 multiple-choice questions carrying 1 mark each,
              and candidates are given 2.5 hours to solve each paper.
            </p>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {uptet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tstet">
            <h2>6-Telangana State Teacher Eligibility Test (TSTET)</h2>
            <p>
              The Department of School Education, Government of Telangana,
              conducts the Telangana State Teachers Eligibility Test (TS TET)
              once a year. The TS TET is conducted at two levels: Level 1 and
              Level 2.
            </p>

            <li>
              Level 1: Candidates who qualify this level will be recruited as
              primary teachers responsible for teaching students of Classes 1 to
              5.
            </li>
            <li>
              Level 2: Candidates who qualify this level will be recruited as
              upper primary teachers and will be appointed to teach Classes 6 to
              8 in private or government schools in Telangana.
            </li>
            <p>
              Both Paper 1 (Level 1) and Paper 2 (Level 2) consist of 150
              multiple-choice questions carrying 1 mark each. Candidates are
              given 150 minutes (2.5 hours) to solve each paper.
            </p>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {tstet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td style={{ width: "70%" }}>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="otet">
            <h2>7. Odisha Teacher Eligibility Test (OTET)</h2>
            <p>
              The Odisha State Teacher Eligibility Test (Odisha TET) is a
              state-level exam that enables selected candidates to work as
              teachers in government or private schools in Odisha. Candidates
              can appear for this exam after completing their Bachelor of
              Education (B.Ed.) degree.
            </p>
            <p>The exam consists of two papers:</p>

            <li>Paper 1: Total marks - 150</li>
            <li>Paper 2: Total marks - 90</li>

            <p>
              For both papers, candidates are given 2 hours and 30 minutes to
              solve the questions.
            </p>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {otet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rtet">
            <h2>8. Rajasthan Teacher Eligibility Test (RTET)</h2>
            <p>
              The Rajasthan Teacher Eligibility Test (RTET) or Rajasthan
              Eligibility Examination for Teachers (REET) is conducted to test
              the knowledge of candidates wishing to become teachers in the
              state of Rajasthan. It is mandatory for all aspirants to qualify
              for the RTET or REET to become a teacher in the state.
            </p>

            <li>
              {" "}
              Stage I: Candidates who qualify for this stage can become teachers
              for primary classes.
            </li>
            <li>
              Stage II: Aspirants who qualify this stage are selected to teach
              students for upper primary classes.
            </li>

            <p>
              Both papers carry 150 marks each, and there is no negative
              marking. Candidates can appear for either Paper I, Paper II, or
              both, based on their preferences. After the exam, a list of
              cut-off marks is released, and candidates whose scores match or
              exceed the cut-off will be awarded an RTET certificate.
            </p>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {rtet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tntet">
            <h2>
              The Tamil Nadu Teacher Eligibility Test (TNTET) is a state-level
              exam conducted by the Teachers Recruitment Board (TRB) in an
              offline mode. The candidates who qualify for this exam are
              appointed as teachers for elementary and primary levels in Tamil
              Nadu.
            </h2>

            <p>The TNTET is divided into two papers:</p>

            <li>
              Stage I: Candidates who qualify for this stage can become teachers
              for primary classes.(Class I To V).
            </li>
            <li>
              Stage II: Aspirants who qualify this stage are selected to teach
              students for upper primary classes.(VI To VII).
            </li>

            <p>
              Each paper consists of 150 questions, and candidates have a
              duration of 3 hours to solve each paper.
            </p>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {tntet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ktet">
            <h2>10. Kerala Teacher Eligibility Test (KTET)</h2>
            <p>
              The Kerala Teacher Eligibility Test (KTET) is a state-level
              eligibility test conducted by the Kerala State Education Board
              (KSEB) twice a year to recruit candidates for teaching posts in
              the state. Through the KTET exam, the eligibility of aspirants is
              tested for Lower Primary, Upper Primary, and High School classes.
            </p>
            <p>
              The candidates who qualify for the exam are recruited to teach
              classes 1 to 12, with separate papers for different levels:
            </p>
            <li>
              {" "}
              Paper 1: For recruitment as teachers for Primary classes (Classes
              1 to 5)
            </li>
            <li>
              Paper 2: For recruitment as teachers for Upper Primary classes
              (Classes 6 to 8){" "}
            </li>
            <li>
              {" "}
              Paper 3: For recruitment as teachers for Secondary classes
              (Classes 9 to 12)
            </li>

            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th colSpan="2">Eligibility Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  {ktet.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="state_level">
            <h2>State Level Eligibility Test or State Eligibility Test</h2>
            <div className="patter-table">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Entrance Test</th>
                    <th>Position</th>
                    <th>Age Limit</th>
                    <th>Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {state_level.map((item, index) => (
                    <tr key={index}>
                      <td>{item.test}</td>
                      <td>{item.name}</td>
                      <td>{item.name}</td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StateTET;
