package com.example.hairsalon.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;
import lombok.Data;
import lombok.ToString;

@Data
@Entity(name = "USER")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "FIRST_NAME", length = 50, nullable = false)
	private String firstName;
	
	@Column(name = "LAST_NAME", length = 50, nullable = false)
	private String lastName;

	@Column(name="USERNAME", unique = true, length = 50, nullable = false)
	private String username;

	@Column(name = "PASSWORD", length = 100, nullable = false)
	private String password;

	@Column(name = "DATE_OF_BIRTH", nullable = false)
	private Date dateOfBirth;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "USER_AUTHORITY",
            joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "id")})
    private List<Authority> authorities;

	@OneToMany
	@JoinTable(
			name = "USER_SCHEDULED_RESERVATION",
			joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "RESERVATION_ID", referencedColumnName = "id")})
	@ToString.Exclude
	private List<Reservation> scheduledReservations;

	@OneToMany
	@JoinTable(
			name = "USER_APPROVED_RESERVATION",
			joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "RESERVATION_ID", referencedColumnName = "id")})
	@ToString.Exclude
	private List<Reservation> approvedReservations;

	@OneToMany
	@JoinTable(
			name = "USER_SERVED_RESERVATION",
			joinColumns = {@JoinColumn(name = "USER_ID", referencedColumnName = "id")},
			inverseJoinColumns = {@JoinColumn(name = "RESERVATION_ID", referencedColumnName = "id")})
	@ToString.Exclude
	private List<Reservation> servedReservations;

}