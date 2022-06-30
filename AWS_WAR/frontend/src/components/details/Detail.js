import React, { useContext } from "react";
import { AccountContext } from "../Account";
import "./Detail.css";

const Detail = () => {
  const { getSession } = useContext(AccountContext);

  return (
    <div>
      The AWS Well-Architected Review is a systematic assessment of your cloud
      architecture. It looks to see whether you're following the AWS
      Well-Architected Framework and which areas of the framework you can
      improve upon. This framework is one of the most important resources at
      your disposal if you're building and running workloads on AWS. Following
      it will help you optimize multiple areas of your cloud systems, including
      their performance, cybersecurity, and even their cost-effectiveness. Cloud
      computing is one of the most important tools your organization can use to
      address its business needs. It's cost-efficient and helps companies of all
      sizes secure the resources needed to compete in a modern business
      landscape. Naturally, you want to get the most out of those benefits, so
      your cloud services are safe, efficient, and give you the most bang for
      your buck. Regularly running an AWS WAR helps with that by showing you
      which elements of AWS you can optimize for better performance. The AWS WAR
      is based on the five pillars of the Well-Architected Framework. Conducting
      a review will help you: Identify critical issues and prioritize solutions
      to those problems.Stay current with any changes in AWS.Reduce unnecessary
      expenses associated with your cloud infrastructure.Optimize the
      performance of your AWS environment.Help you maintain compliance and good
      security posture. From a cybersecurity point of view, the AWS WAR is
      especially important. That's because it can significantly reduce the
      number of cybersecurity incidents your organization experiences. The WAR
      report is a breakdown of your AWS systems and how well your organization
      has been following the Well-Architected Framework. This is where you'll
      learn about what you're doing right and where you need to improve.
      Typically, areas of improvement will be prioritized as either High Risk or
      Medium Risk. This is also the part of the review process where you'll look
      at your improvement strategy. If an AWS Well-Architected Partner conducted
      the review for you, they'll likely give you a prioritized plan for
      addressing your risks.
    </div>
  );
};

export default Detail;
