-- FUNCTION: public.assign_auto_to_wash(numeric, numeric)

-- DROP FUNCTION public.assign_auto_to_wash(numeric, numeric);

CREATE OR REPLACE FUNCTION public.assign_auto_to_wash(
	br_id numeric,
	curr_user numeric)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE 
AS $BODY$

declare
	i numeric;
	i_wash numeric;
	re_id numeric[];
	order_id numeric[];
	orderItem customer_order;
	reItem receipt;
	i_order numeric;
	i_rec numeric;
    all_washer numeric[];
    none_washer numeric[];
	pending_washer_list numeric[];
	pending_washer_count numeric;
    working_washer numeric[];
begin
	re_id = ARRAY(select re.id from receipt re inner join customer_order co on co.id = re.order_id where co.branch_id =  br_id and co.status = 'PENDING_SERVING');
	order_id = ARRAY(select co.id from receipt re inner join customer_order co on co.id = re.order_id 
					where co.branch_id = br_id  and co.status = 'PENDING_SERVING' order by co.delivery_date ASC, co.delivery_time_id ASC);
    all_washer = ARRAY(select id from washing_machine where branch_id= br_id);

    working_washer = ARRAY(select distinct w.washing_machine_id from wash w 
                            inner join washing_machine wm on wm.id = w.washing_machine_id
                            where wm.branch_id= br_id and w.status = 'SERVING' order by w.id);
	
	foreach i_wash in array working_washer loop
	begin
		select count(1) into pending_washer_count  from wash w 
                            inner join washing_machine wm on wm.id = w.washing_machine_id
                            where wm.branch_id= br_id and w.status = 'PENDING_SERVING' and w.id = i_wash order by w.id;					
		pending_washer_count = array_append(pending_washer_count,pending_washer_count);
	end;
	end loop;


    none_washer = ARRAY (select id from washing_machine where branch_id= br_id and id <> ANY(working_washer);

    foreach i_order in array order_id loop
		begin
			select * into orderItem from customer_order where id  = i_order;


		end;
	end loop;



	-- gan may giat cho
    if none_washer is null then

    elsif
        
    end if

	return success = true;
end;

$BODY$;

ALTER FUNCTION public.assign_auto_to_wash(numeric, numeric)
    OWNER TO postgres;

GRANT EXECUTE ON FUNCTION public.assign_auto_to_wash(numeric, numeric) TO postgres;

GRANT EXECUTE ON FUNCTION public.assign_auto_to_wash(numeric, numeric) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.assign_auto_to_wash(numeric, numeric) TO auth_authenticated WITH GRANT OPTION;

