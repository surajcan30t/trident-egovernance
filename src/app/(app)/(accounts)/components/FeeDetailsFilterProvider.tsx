'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

type FeesDetailsFilterContextType = {
  filterParticulars: string[];
  sessions: string[];
  paymentMode: string[];
  feeGroups: string[];
  partOf: string[];
  distinctCourses: string[];
  branches: {
    [course:string]:{
      [branch:string]:{
        branchCode:string;
        branch:string;
      }
    }
  }
  loading: boolean;
};

type BranchData = {
  branchCode: string;
  branch: string;
  course: string;
  courseInProgress: number;
}

type CourseData = {
  course: string;
  branches: BranchData[];
}

type DistinctValues = {
  course: CourseData[];
  particulars?: string[];
}

const FeesDetailsFilterContext = createContext<FeesDetailsFilterContextType | undefined>(undefined);

export const FeesDetailsFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken
  const user = session?.user?.userType?.userJobInformationDto?.jobTitle
  const [filterParticulars, setFilterParticulars] = useState<string[]>([]);
  const [feeGroups, setFeeGroups] = useState<string[]>([]);
  const [partOf, setPartOf] = useState<string[]>([]);
  const [sessions, setSessions] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState<string[]>([]);
  const [distinctCourses, setDistinctCourses] = useState<string[]>([]);
  const [branches, setBranches] = useState<{
    [course: string]: {
      [branch: string]: {
        branchCode: string;
        branch: string;
      }
    }
  }>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user !== 'ACCOUNTS') return
    const fetchParticulars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/accounts-section/get-feeGroups-partOf`, {
          method: 'GET',
          cache: 'no-cache',
          headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json();
      setFeeGroups(data.feeGroups);
      setPartOf(data.partOfs);
      } catch (error) {
        return;
      }
    };
    fetchParticulars();
  }, [token]);

  useEffect(() => {
    const fetchOptionValues = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/public/branches`, {
          method: 'GET',
          cache: 'no-cache',
        }).then(res => res.json()) as CourseData[]; 

        const courseBranchMap: {
          [course: string]: {
            [branch: string]: {
              branchCode: string;
              branch: string;
            }
          }
        } = {};

        response.forEach((courseData) => {
          const branchMap: {
            [branch: string]: {
              branchCode: string;
              branch: string;
            }
          } = {};
  
          courseData.branches.forEach((branch) => {
            branchMap[branch.branch] = {
              branchCode: branch.branchCode,
              branch: branch.branch
            };
          });
  
          courseBranchMap[courseData.course] = branchMap;
        });
        setDistinctCourses(response.map(c => c.course));
        setBranches(courseBranchMap);

      } catch (error) {
        return
      } finally {
        setLoading(false);
      }
    };

    fetchOptionValues();
  }, []);

  return (
    <FeesDetailsFilterContext.Provider value={{ 
      filterParticulars, 
      feeGroups,
      partOf,
      sessions, 
      paymentMode, 
      loading ,
      distinctCourses,
      branches
    }}>
      {children}
    </FeesDetailsFilterContext.Provider>
  );
};

export const useParticulars = (): FeesDetailsFilterContextType => {
  const context = useContext(FeesDetailsFilterContext);
  if (!context) {
    throw new Error('useParticulars must be used within a ParticularsProvider');
  }
  return context;
};
