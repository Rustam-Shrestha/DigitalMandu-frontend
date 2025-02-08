import React, { useEffect, useState } from 'react';
import { APIForAuthenticated } from '../../http';
import Loader from '../../globals/components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../store/cartSlice';

const KhaltiSuccess = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const pidx = queryParams.get('pidx');
  const [loading, setLoading] = useState(true);
  
  const verifyPidx = async () => {
    const dispatch = useDispatch()
    try {
      const response = await APIForAuthenticated.post("/payment/verifyPidx", { pidx });
      console.log(response.data);
      if (response.status === 200) {
        setLoading(false);
        dispatch(emptyCart())
        alert(response.data.message )
        window.location.href="/"
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading state is updated in case of error
    }
  };

  useEffect(() => {
    verifyPidx();
  }, []);

  if (loading) {
    return <Loader status='verifying' />;
  }

  return (
    <div>
      <Loader status='verified' />
      KhaltiSuccess
    </div>
  );
};

export default KhaltiSuccess;